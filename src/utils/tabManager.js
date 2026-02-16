// tabManager.js - Shared tab management utility
// import clarityService from './ClarityService'
// import { activityTracker } from './ActivityTracker'

// TIMING CONSTANTS
// Close monitoring interval (ms) - checks if tabs are closed
const CLOSE_MONITOR_INTERVAL_MS = 2000
// Cache cleanup interval (ms) - validates cached window references  
const CACHE_CLEANUP_INTERVAL_MS = 30000
// Highlight duration (ms)
const HIGHLIGHT_DURATION_MS = 3000
// Hash navigation retry delays (ms) - unified for all hash types
const HASH_NAVIGATION_DELAYS = [100, 300, 600, 1000, 2000]
// New tab highlighting delays (ms)
const NEW_TAB_HIGHLIGHT_INITIAL_DELAY_MS = 500
const NEW_TAB_HIGHLIGHT_RETRY_DELAY_MS = 300
const NEW_TAB_HIGHLIGHT_MAX_ATTEMPTS = 10
/**
 * Apply consistent highlighting to an element
 */
export const applyHighlighting = (element, duration = 3000) => {
  // Validate element is non-null and has dataset property
  if (!element || typeof element.dataset === 'undefined') {
    return false
  }

  try {
    // Check if element is already being highlighted (prevent duplicate timeouts)
    if (element.dataset.highlighting === 'true') {
      return true
    }

    // Mark element as being highlighted
    element.dataset.highlighting = 'true'

    // Save original inline styles (only if they exist)
    const hadInlineBackground = element.style.backgroundColor !== ''
    const hadInlineBorder = element.style.border !== ''
    const hadInlineTransition = element.style.transition !== ''
    const originalBackground = element.style.backgroundColor
    const originalBorder = element.style.border
    const originalTransition = element.style.transition

    element.style.backgroundColor = '#E6EDDD'
    element.style.transition = 'all 0.3s ease'
    element.style.border = '2px solid #C8D4B8'

    setTimeout(() => {
      // Remove highlight by clearing the inline styles completely if they weren't set before
      if (hadInlineBackground) {
        element.style.backgroundColor = originalBackground
      } else {
        element.style.removeProperty('background-color')
      }

      if (hadInlineBorder) {
        element.style.border = originalBorder
      } else {
        element.style.removeProperty('border')
      }

      setTimeout(() => {
        if (hadInlineTransition) {
          element.style.transition = originalTransition
        } else {
          element.style.removeProperty('transition')
        }
        // Clear highlighting flag
        delete element.dataset.highlighting
      }, 300)
    }, duration)

    return true
  } catch (e) {
    return false
  }
}

/**
 * Check if a window's document is ready for DOM manipulation
 */
const isDocumentReady = (windowRef) => {
  try {
    return (
      windowRef &&
      !windowRef.closed &&
      windowRef.document &&
      (windowRef.document.readyState === 'complete' ||
        windowRef.document.readyState === 'interactive')
    )
  } catch (e) {
    return false
  }
}

/**
 * Enhanced element finding with multiple strategies
 */
const findElementInWindow = (windowRef, targetId) => {
  if (!windowRef || !windowRef.document) return null

  const doc = windowRef.document
  let targetElement = null

  // Strategy 1: Direct getElementById
  targetElement = doc.getElementById(targetId)

  // Strategy 2: Escaped CSS selector
  if (!targetElement) {
    try {
      const escapedId = targetId.replace(
        /[!"#$%&'()*+,./:<=>?@[\\\]^`{|}~]/g,
        '\\$&'
      )
      targetElement = doc.querySelector(`#${escapedId}`)
    } catch (e) {
      console.warn('TabManager: Failed to escape CSS selector:', e)
    }
  }

  // Strategy 3: Attribute selector
  if (!targetElement) {
    targetElement = doc.querySelector(`[id="${targetId}"]`)
  }

  // Strategy 4: Name attribute (for older HTML)
  if (!targetElement) {
    targetElement = doc.querySelector(`[name="${targetId}"]`)
  }

  // Strategy 5: Anchor with matching name
  if (!targetElement) {
    targetElement = doc.querySelector(`a[name="${targetId}"]`)
  }

  return targetElement
}

/**
 * Robust scrolling with multiple methods and attempts
 * Returns true if scrolling succeeded
 */
const scrollToElementInWindow = (windowRef, targetElement, targetId) => {
  // Validate element exists
  if (!targetElement) {
    console.warn('TabManager: Cannot scroll to null element')
    return false
  }

  // Apply highlighting using the helper function
  applyHighlighting(targetElement, HIGHLIGHT_DURATION_MS)

  // Method 1: Standard scrollIntoView (preferred)
  try {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
    return true
  } catch (e) {
    console.warn('TabManager: scrollIntoView failed, trying fallback:', e)
  }

  // Method 2: Calculate position and use window.scrollTo (fallback)
  try {
    const rect = targetElement.getBoundingClientRect()
    const scrollTop =
      windowRef.pageYOffset || windowRef.document.documentElement.scrollTop
    const targetTop = rect.top + scrollTop

    windowRef.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    })
    return true
  } catch (e) {
    console.warn('TabManager: window.scrollTo failed, trying force scroll:', e)
  }

  // Method 3: Force immediate scroll (last resort)
  try {
    const rect = targetElement.getBoundingClientRect()
    const scrollTop =
      windowRef.pageYOffset || windowRef.document.documentElement.scrollTop
    const targetTop = rect.top + scrollTop

    windowRef.document.documentElement.scrollTop = targetTop
    windowRef.document.body.scrollTop = targetTop // For older browsers
    return true
  } catch (e) {
    console.warn('TabManager: Force scroll failed:', e)
    return false
  }
}

// Track opened document tabs to prevent duplicates and manage focus
// Use localStorage for persistence across page refreshes and tabs
const STORAGE_KEY = 'gtl_opened_tabs'
const SESSION_KEY = 'gtl_session_id'

// In-memory cache for window references (still needed for focus operations)
const windowReferencesCache = new Map()

// Track all interval IDs for cleanup on page unload
const activeIntervals = new Set()

// Track active hash navigation timeouts for cancellation
let activeHashTimeouts = []


/**
 * Detect new browser session and clear stale localStorage entries
 * Uses sessionStorage (which clears on browser close) to detect new sessions
 */
const initializeSession = () => {
  if (typeof window === 'undefined') return

  // Check if we have a session ID in sessionStorage
  const existingSessionId = sessionStorage.getItem(SESSION_KEY)

  if (!existingSessionId) {
    // New browser session detected - clear stale tab tracking data
    localStorage.removeItem(STORAGE_KEY)
    windowReferencesCache.clear()

    // Create a new session ID
    const newSessionId = Date.now().toString(36) + Math.random().toString(36).substring(2)
    sessionStorage.setItem(SESSION_KEY, newSessionId)
  }
}

// Initialize session detection when module loads
initializeSession()

// Cleanup all intervals when page unloads to prevent memory leaks
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    activeIntervals.forEach((intervalId) => {
      clearInterval(intervalId)
    })
    activeIntervals.clear()
    // Clear any pending hash navigation timeouts
    activeHashTimeouts.forEach(timeoutId => clearTimeout(timeoutId))
    activeHashTimeouts = []
  })
}

/**
 * Periodically validate and clean up stale window references from cache
 * This prevents memory leaks from closed tabs not being detected
 */
const startCacheCleanup = () => {
  if (typeof window === 'undefined') return

  const cleanupInterval = setInterval(() => {
    const trackedTabs = getTrackedTabs()
    let hasChanges = false

    // Validate all cached window references
    for (const [url, windowRef] of windowReferencesCache.entries()) {
      try {
        if (!windowRef || windowRef.closed) {
          windowReferencesCache.delete(url)
          if (trackedTabs[url]) {
            delete trackedTabs[url]
            hasChanges = true
          }
        }
      } catch (e) {
        // Cross-origin or inaccessible - clean up
        windowReferencesCache.delete(url)
        if (trackedTabs[url]) {
          delete trackedTabs[url]
          hasChanges = true
        }
      }
    }

    if (hasChanges) {
      saveTrackedTabs(trackedTabs)
    }
  }, CACHE_CLEANUP_INTERVAL_MS)

  activeIntervals.add(cleanupInterval)
}

// Start cache cleanup when module loads
if (typeof window !== 'undefined') {
  startCacheCleanup()
}

/**
 * Get all tracked tabs from localStorage
 * @returns {Object} Object with normalized URLs as keys and window names as values
 */
const getTrackedTabs = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (e) {
    console.warn('TabManager: Failed to read tracked tabs:', e)
    return {}
  }
}

/**
 * Save tracked tabs to localStorage
 * @param {Object} tabs - Object with normalized URLs as keys and window names as values
 */
const saveTrackedTabs = (tabs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs))
  } catch (e) {
    console.warn('TabManager: Failed to save tracked tabs:', e)
  }
}

/**
 * Add a tab to tracking
 * @param {string} normalizedUrl - Normalized URL
 * @param {string} windowName - Unique window name for this tab
 */
const trackTab = (normalizedUrl, windowName) => {
  const tabs = getTrackedTabs()
  tabs[normalizedUrl] = windowName
  saveTrackedTabs(tabs)
}

/**
 * Remove a tab from tracking
 * @param {string} normalizedUrl - Normalized URL
 */
const untrackTab = (normalizedUrl) => {
  const tabs = getTrackedTabs()
  delete tabs[normalizedUrl]
  saveTrackedTabs(tabs)
  windowReferencesCache.delete(normalizedUrl)
}

/**
 * Normalize URL to ensure consistent comparison
 * Removes origin, trailing slashes, and hash fragments
 * Preserves query parameters so different params = different URLs
 */
const normalizeUrl = (url) => {
  try {
    // Handle relative URLs
    let fullUrl = url
    if (!url.startsWith('http')) {
      fullUrl = `${window.location.origin}${url.startsWith('/') ? url : '/' + url}`
    }

    // Create URL object for proper parsing
    const urlObj = new URL(fullUrl)

    // Return pathname + search params
    let normalized = urlObj.pathname.replace(/\/$/, '')

    // Include sorted search params for consistent comparison
    if (urlObj.search) {
      urlObj.searchParams.sort()
      normalized += urlObj.searchParams.toString() ? '?' + urlObj.searchParams.toString() : ''
    }
    return normalized
  } catch (e) {
    console.warn('TabManager: Failed to normalize URL:', url, e)
    // basic normalization - keep query params
    return url.split('#')[0].replace(window.location.origin, '').replace(/\/$/, '')
  }
}

/**
 * Set up interval to monitor if a tab gets closed
 * @param {Window} windowRef - Window reference to monitor
 * @param {string} normalizedUrl - Normalized URL for cleanup
 */
const setupCloseMonitoring = (windowRef, normalizedUrl) => {
  // Check if we already have monitoring for this URL to prevent duplicates
  // The cache cleanup will handle stale references periodically

  const checkClosed = setInterval(() => {
    try {
      if (windowRef.closed) {
        untrackTab(normalizedUrl)
        clearInterval(checkClosed)
        activeIntervals.delete(checkClosed)
      }
    } catch (e) {
      // Window might be from different origin or inaccessible
      untrackTab(normalizedUrl)
      clearInterval(checkClosed)
      activeIntervals.delete(checkClosed)
    }
  }, CLOSE_MONITOR_INTERVAL_MS)

  // Track the interval ID for cleanup on page unload
  activeIntervals.add(checkClosed)
}

/**
 * Safely focus a window using the User Activation API
 * @param {Window} windowRef - Window reference to focus
 * @returns {boolean} - Whether focus was attempted
 */
const safeFocusWindow = (windowRef) => {
  if (!windowRef || windowRef.closed) return false

  try {
    // Only call focus if user activation is confirmed active, Firefox blocks .focus() without active user activation
    if (navigator.userActivation && navigator.userActivation.isActive) {
      windowRef.focus()
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

/**
 * Opens a URL in a new tab or focuses existing tab if same document is already open
 * @param {string} url - Full URL to open
 * @param {string} linkText - Text content of the link (for article mock)
 * @param {function} showSnackbar - Function to show user feedback
 * @returns {void}
 */
export const openDocumentInTab = (url, linkText, showSnackbar) => {

  // Handle special URL schemes that should not be processed by tab manager
  if (
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('sms:')
  ) {
    window.location.href = url
    if (showSnackbar) {
      const scheme = url.split(':')[0]
      showSnackbar(`Opening ${scheme} link in default application`, 'info')
    }
    return
  }

  // Normalize URL for consistent tracking
  const normalizedUrl = normalizeUrl(url)
  const hashFragment = url.includes('#') ? url.split('#')[1] : null

  // Create slug from URL (for window.open)
  let slug = url
  if (url.startsWith(window.location.origin)) {
    slug = url.replace(window.location.origin, '')
  }

  // Get tracking info
  const trackedTabs = getTrackedTabs()
  const trackedWindowName = trackedTabs[normalizedUrl]

  // Strategy 1: Check if we have a cached window reference that's still valid
  const existingWindow = windowReferencesCache.get(normalizedUrl)

  if (existingWindow && trackedWindowName) {
    try {
      // Verify the window is still open and not the current window
      if (!existingWindow.closed && existingWindow !== window && existingWindow !== window.self) {
        // Valid existing tab found - use window.open with the name for reliable focus
        // Modern browsers block direct .focus() on cached refs but allow window.open('', name)
        const focusedWindow = window.open('', trackedWindowName)

        if (focusedWindow && focusedWindow !== window && !focusedWindow.closed) {
          // Update our cache with fresh reference
          windowReferencesCache.set(normalizedUrl, focusedWindow)
          safeFocusWindow(focusedWindow)
          if (hashFragment) {
            handleHashNavigation(focusedWindow, hashFragment, showSnackbar)
          } else if (showSnackbar) {
            showSnackbar('Switched to existing document tab', 'info')
          }
          return
        }
      }
      // Window is closed or is current window - clean up stale reference
      windowReferencesCache.delete(normalizedUrl)
      untrackTab(normalizedUrl)
    } catch (e) {
      // Error accessing the window (security/cross-origin) - clean up
      windowReferencesCache.delete(normalizedUrl)
      untrackTab(normalizedUrl)
    }
  } else if (existingWindow) {
    // We have a cached reference but no tracked window name, Generate a window name and use window.open to focus (avoids Firefox popup blocking)
    try {
      if (!existingWindow.closed && existingWindow !== window && existingWindow !== window.self) {
        windowReferencesCache.delete(normalizedUrl)
      } else {
        windowReferencesCache.delete(normalizedUrl)
        untrackTab(normalizedUrl)
      }
    } catch (e) {
      windowReferencesCache.delete(normalizedUrl)
      untrackTab(normalizedUrl)
    }
  }

  // Strategy 2: If tracked in localStorage (opened from another page), try to find the window
  if (trackedWindowName) {
    try {
      // Try to get reference to existing tab using the tracked window name
      const existingRef = window.open('', trackedWindowName)

      if (existingRef) {
        // Check if this is the current window (happens when no window with that name exists)
        const isSameWindow = existingRef === window || existingRef === window.self

        if (isSameWindow) {
          // No actual tab exists with that name - clean up tracking
          untrackTab(normalizedUrl)
        } else if (!existingRef.closed) {
          // Got a reference to a different window - check if it has content
          try {
            const existingHref = existingRef.location.href
            const isBlank = !existingHref || existingHref === 'about:blank' || existingHref === ''

            if (isBlank) {
              // This is a blank window we just created - close it and open properly
              existingRef.close()
              untrackTab(normalizedUrl)
            } else {
              // It's an existing tab with content - use safe focus
              windowReferencesCache.set(normalizedUrl, existingRef)
              safeFocusWindow(existingRef)

              if (hashFragment) {
                handleHashNavigation(existingRef, hashFragment, showSnackbar)
              } else if (showSnackbar) {
                showSnackbar('Switched to existing document tab', 'info')
              }

              setupCloseMonitoring(existingRef, normalizedUrl)
              return
            }
          } catch (e) {
            // Cross-origin - might be a valid tab we can't access details of
            // Use safe focus with User Activation API check
            windowReferencesCache.set(normalizedUrl, existingRef)
            safeFocusWindow(existingRef)

            if (showSnackbar) {
              showSnackbar('Switched to existing document tab', 'info')
            }

            setupCloseMonitoring(existingRef, normalizedUrl)
            return
          }
        } else {
          // Window is closed - clean up
          untrackTab(normalizedUrl)
        }
      }
    } catch (e) {
      // Error trying to find window - clean up tracking
      untrackTab(normalizedUrl)
    }
  }

  // Strategy 3: Open a new tab
  // Generate a unique window name for tracking
  const newWindowName = `gtl_tab_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`

  // Open with the unique name directly (not _blank) for better tracking
  const newWindow = window.open(slug, newWindowName)

  if (newWindow && newWindow !== window) {

    // Cache the window reference
    windowReferencesCache.set(normalizedUrl, newWindow)

    // Track in localStorage with the new name
    trackTab(normalizedUrl, newWindowName)

    // activityTracker?.trackNewTabOpen?.(
    //   url,
    //   getTrackCategory(url),
    //   window.location.href
    // )

    // Handle highlighting for new tabs with hash fragments
    if (hashFragment) {
      setupNewTabHighlighting(newWindow, hashFragment)
    }

    if (showSnackbar) {
      const documentTitle = linkText || 'Document'
      showSnackbar(`${documentTitle} opened in new tab`, 'success')
    }

    // Set up close monitoring
    setupCloseMonitoring(newWindow, normalizedUrl)
  } else {
    if (showSnackbar) {
      showSnackbar('Could not open new tab - check popup blocker', 'error')
    }
  }
}

/**
 * Handle hash fragment navigation in an existing tab
 */
function handleHashNavigation(targetWindow, hashFragment, showSnackbar) {
  if (!hashFragment) {
    if (showSnackbar) {
      showSnackbar('Switched to existing document tab', 'info')
    }
    return
  }

  // Update URL hash first - also serves as cross-origin check
  try {
    targetWindow.location.hash = `#${hashFragment}`
  } catch (e) {
    console.warn('TabManager: Cross-origin window detected, cannot navigate to hash:', e)
    // Cross-origin: can't access the window's DOM, abort all retries
    if (showSnackbar) {
      showSnackbar('Switched to existing document tab', 'info')
    }
    return
  }

  // Cancel any pending hash navigation timeouts to prevent accumulation from rapid clicks
  activeHashTimeouts.forEach(timeoutId => clearTimeout(timeoutId))
  activeHashTimeouts = []

  // Track if navigation succeeded to short-circuit remaining attempts
  let navigationSucceeded = false
  let completedAttempts = 0
  const totalAttempts = HASH_NAVIGATION_DELAYS.length

  // Helper to clean up timeouts array after all attempts complete
  const cleanupIfDone = () => {
    completedAttempts++
    if (completedAttempts >= totalAttempts || navigationSucceeded) {
      // All attempts done or succeeded - clear the array to prevent memory leak
      activeHashTimeouts = []
    }
  }

  // Use unified timing for all hash types
  HASH_NAVIGATION_DELAYS.forEach((delay, index) => {
    const timeoutId = setTimeout(() => {
      // Skip if already succeeded
      if (navigationSucceeded) {
        cleanupIfDone()
        return
      }

      try {
        const targetElement = findElementInWindow(targetWindow, hashFragment)

        if (targetElement) {
          scrollToElementInWindow(targetWindow, targetElement, hashFragment)
          navigationSucceeded = true
          cleanupIfDone()
          return
        }

        // On the last attempt, try native hash navigation WITH highlighting
        if (index === HASH_NAVIGATION_DELAYS.length - 1 && !navigationSucceeded) {
          try {
            const currentUrl = targetWindow.location.href.split('#')[0]
            targetWindow.location.href = `${currentUrl}#${hashFragment}`
            const highlightTimeoutId = setTimeout(() => {
              const targetElement = findElementInWindow(targetWindow, hashFragment)
              if (targetElement) applyHighlighting(targetElement, HIGHLIGHT_DURATION_MS)
              // Final cleanup after highlight attempt
              activeHashTimeouts = []
            }, NEW_TAB_HIGHLIGHT_INITIAL_DELAY_MS)
            activeHashTimeouts.push(highlightTimeoutId)
          } catch (e) {
            console.warn('TabManager: Native hash navigation failed:', e)
          }
        }
        cleanupIfDone()
      } catch (e) {
        console.warn('TabManager: Scroll attempt failed:', e)
        cleanupIfDone()
      }
    }, delay)
    activeHashTimeouts.push(timeoutId)
  })

  if (showSnackbar) {
    showSnackbar(`Navigated to section in existing tab: ${hashFragment}`, 'info')
  }
}

/**
 * Setup highlighting for new tabs with hash fragments
 * Uses local timeout tracking to prevent memory leaks
 */
function setupNewTabHighlighting(newWindow, hashFragment) {
  let attempt = 0
  // Use local array for this highlighting session to prevent memory leak
  const localTimeouts = []

  const cleanup = () => {
    // Clear all local timeouts
    localTimeouts.forEach(id => clearTimeout(id))
    localTimeouts.length = 0
  }

  const tryHighlight = () => {
    attempt++

    if (attempt > NEW_TAB_HIGHLIGHT_MAX_ATTEMPTS) {
      cleanup()
      return
    }

    // Check if window is still accessible
    try {
      if (newWindow.closed) {
        cleanup()
        return
      }
    } catch (e) {
      // Cross-origin or inaccessible - abort
      cleanup()
      return
    }

    if (!isDocumentReady(newWindow)) {
      const timeoutId = setTimeout(tryHighlight, NEW_TAB_HIGHLIGHT_INITIAL_DELAY_MS)
      localTimeouts.push(timeoutId)
      return
    }

    try {
      const targetElement = findElementInWindow(newWindow, hashFragment)
      if (targetElement) {
        const success = applyHighlighting(targetElement, HIGHLIGHT_DURATION_MS)
        if (success) {
          cleanup()
          return
        }
      }
    } catch (e) {
      // Cross-origin access failed - abort
      console.warn('TabManager: Cannot access new tab for highlighting:', e)
      cleanup()
      return
    }

    // Retry after a short delay
    const timeoutId = setTimeout(tryHighlight, NEW_TAB_HIGHLIGHT_RETRY_DELAY_MS)
    localTimeouts.push(timeoutId)
  }

  // Start trying after initial delay
  const initialTimeoutId = setTimeout(tryHighlight, NEW_TAB_HIGHLIGHT_INITIAL_DELAY_MS)
  localTimeouts.push(initialTimeoutId)
}

function getTrackCategory(url) {
  if (!url) return 'new_tab'

  const lowerUrl = url.toLowerCase()

  const allGuideTypes = [
    'GUIDE - Federal Tax Authority Guide',
    'GUIDE - Zakat, Tax and Customs Authority',
    'GUIDE - Foreign Account Tax Compliance Act Guide',
    'GUIDE - VAT Taxpayer Guide',
    'GUIDE - Oman Tax Authority',
    'GUIDE - National Bureau for Revenue',
    'PC - Public Clarification',
    'CIRCULAR - Circular',
  ]

  const allDecisionTypes = [
    'BL - Bylaws',
    'ERS - Executive Regulations',
    'IR - Implementing Regulations',
    'EB - Executive Bylaws',
    'CD - Cabinet Decision',
    'MD - Ministerial Decision',
    'FTA - Federal Tax Authority Decision',
    'ZD - ZATCA Decision',
    'TD - Tax Department, Ministry of Finance',
    'ER - Executive Rules and Instructions',
    'JD - Judicial Decision',
  ]

  // 1. Extract prefixes (e.g., 'bl', 'ers', 'guide', 'pc')
  const decisionPrefixes = allDecisionTypes.map((item) =>
    item.split(' - ')[0].toLowerCase()
  )
  const guidePrefixes = allGuideTypes.map((item) =>
    item.split(' - ')[0].toLowerCase()
  )

  // 2. Check conditions in order of priority
  if (lowerUrl.includes('article')) {
    return 'article'
  }

  if (decisionPrefixes.some((prefix) => lowerUrl.includes(prefix))) {
    return 'decision'
  }

  if (guidePrefixes.some((prefix) => lowerUrl.includes(prefix))) {
    return 'guide'
  }

  if (lowerUrl.includes('dtaa')) {
    return 'DTAA'
  }

  // Fallback
  return 'new_tab'
}

/**
 * Legacy function for compatibility with existing articleCardHandlers
 * @param {object} article - Article object
 * @param {string} slug - URL slug
 * @param {function} showSnackbar - Snackbar function
 * @returns {void}
 */
export const handleOpenInNewTab = (article, slug, showSnackbar) => {
  // Create the full URL
  const fullUrl = `${window.location.origin}${slug}`
  const linkText = article?.title || article?.name || 'Document'

  // Use the new shared tab manager
  openDocumentInTab(fullUrl, linkText, showSnackbar)
}

/**
 * Get current tracking status for debugging
 * @returns {object} Current tracking information
 */
export const getTrackingInfo = () => {
  const trackedTabs = getTrackedTabs()
  const trackedUrls = Object.keys(trackedTabs)

  // Check which tabs are still open via cached references
  const openTabs = trackedUrls.filter((url) => {
    const windowRef = windowReferencesCache.get(url)
    return windowRef && !windowRef.closed
  })

  return {
    totalTracked: trackedUrls.length,
    openTabs: openTabs.length,
    trackedUrls,
    openTabUrls: openTabs,
  }
}

/**
 * Clean up function to clear all tracking
 * @returns {void}
 */
export const clearDocumentTabsTracking = () => {
  localStorage.removeItem(STORAGE_KEY)
  windowReferencesCache.clear()
  // Clear all active intervals
  activeIntervals.forEach((intervalId) => {
    clearInterval(intervalId)
  })
  activeIntervals.clear()
  // clarityService?.trackEvent?.('tab_tracking_cleared', {
  //   timestamp: new Date().toISOString(),
  // })
}