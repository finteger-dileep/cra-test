import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import { openDocumentInTab, clearDocumentTabsTracking, applyHighlighting } from './tabManager'
// import apiService from './ApiService'
// import usePopupAnnotations from './usePopupAnnotations'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'


// Improved highlighting function
export const highlightText = (text, searchQuery) => {
  if (!searchQuery || typeof text !== 'string') return text

  // Escape special characters in the search query
  const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Create a regex that can match the search term
  const regex = new RegExp(`(${escapedQuery})`, 'gi')

  // Split HTML into parts inside tags and text content
  const parts = []
  let inTag = false
  let currentPart = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      if (currentPart) {
        parts.push({ isTag: inTag, content: currentPart })
        currentPart = ''
      }
      inTag = true
      currentPart += text[i]
    } else if (text[i] === '>') {
      currentPart += text[i]
      parts.push({ isTag: inTag, content: currentPart })
      currentPart = ''
      inTag = false
    } else {
      currentPart += text[i]
    }
  }

  if (currentPart) {
    parts.push({ isTag: inTag, content: currentPart })
  }

  // Only highlight text parts, not tag parts
  return parts
    .map((part) => {
      if (part.isTag) return part.content
      return part.content.replace(regex, '<mark>$1</mark>')
    })
    .join('')
}

// Helper function to parse child nodes, especially handling <mark> tags
const parseChildNode = (child, index) => {
  if (child?.name === 'mark') {
    return (
      <mark key={index}>
        {child?.children?.map((subChild) => subChild?.data).join('')}
      </mark>
    )
  }
  return child?.data || ''
}

// Helper function to check if a URL is absolute
const isAbsoluteUrl = (url) => {
  return /^(https?:\/\/|\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,})/i.test(
    url
  )
}

// Helper function to check if URL is external
const isExternalUrl = (url) => {
  if (!url.startsWith('http')) return false
  try {
    const urlObj = new URL(url)
    return urlObj.hostname !== window.location.hostname
  } catch {
    return false
  }
}

// Helper function to check if link is a special bookmark/note link
const isSpecialBookmarkLink = (href) => {
  if (!href || !href.startsWith('#')) return false

  const fragment = href.substring(1) // Remove the #

  // Check for bookmark patterns (include #bookmark, #bookmark0, #bookmark1, etc.)
  // But exclude #bookmarkback, #bookmarkback1, etc.
  if (fragment.startsWith('bookmark')) {
    // If it starts with 'bookmarkback', exclude it
    if (fragment.startsWith('bookmarkback')) {
      return false
    }
    // If it's exactly 'bookmark' or 'bookmark' followed by digits, include it
    const afterBookmark = fragment.substring(8) // 'bookmark'.length = 8
    if (afterBookmark === '' || /^\d+$/.test(afterBookmark)) {
      return true
    }
  }

  // Check for footnote patterns (include #footnote1, #footnote10, etc.)
  // But exclude #footnoteback, #footnoteback1, etc.
  if (fragment.startsWith('footnote')) {
    // If it starts with 'footnoteback', exclude it
    if (fragment.startsWith('footnoteback')) {
      return false
    }
    // If it's 'footnote' followed by digits, include it
    const afterFootnote = fragment.substring(8) // 'footnote'.length = 8
    if (/^\d+$/.test(afterFootnote)) {
      return true
    }
  }

  // Check for gtlnotes patterns (include #gtlnotes0, #gtlnotes1, etc.)
  // But exclude #gtlnotes (without numbers)
  if (fragment.startsWith('gtlnotes')) {
    const afterGtlnotes = fragment.substring(8) // 'gtlnotes'.length = 8
    // Only include if followed by digits (exclude bare 'gtlnotes')
    if (/^\d+$/.test(afterGtlnotes)) {
      return true
    }
  }

  return false
}

// Helper function to open URL in new tab with proper focus management
const openUrlWithFocusManagement = (url, linkText, showSnackbar) => {
  // console.log(`Utils: Opening URL with focus management: ${url}`)
  openDocumentInTab(url, linkText, showSnackbar)
}

// Enhanced CSS selector escaping function
const escapeSelector = (selector) => {
  return selector.replace(/[!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~]/g, '\\$&')
}

// Helper function to find element by ID with special characters
const findElementById = (container, targetId) => {
  // Method 1: Try direct getElementById (works in most cases)
  let targetElement = container.querySelector
    ? container.ownerDocument?.getElementById(targetId) ||
    document.getElementById(targetId)
    : document.getElementById(targetId)

  if (
    targetElement &&
    container.contains &&
    container.contains(targetElement)
  ) {
    return targetElement
  }

  // Method 2: Try escaped selector
  try {
    const escapedId = escapeSelector(targetId)
    targetElement = container.querySelector(`#${escapedId}`)
    if (targetElement) {
      return targetElement
    }
  } catch (e) {
    // console.warn(
    //   `Failed to query with escaped selector: #${escapeSelector(targetId)}`,
    //   e
    // )
  }

  // Method 3: Use attribute selector (most reliable for special characters)
  try {
    targetElement = container.querySelector(`[id="${targetId}"]`)
    if (targetElement) {
      return targetElement
    }
  } catch (e) {
    // console.warn(
    //   `Failed to query with attribute selector: [id="${targetId}"]`,
    //   e
    // )
  }

  // Method 4: Manual search through all elements with IDs
  const allElementsWithId = container.querySelectorAll('[id]')
  for (const element of allElementsWithId) {
    if (element.id === targetId) {
      return element
    }
  }

  // Method 5: Also check for name attribute (fallback for older HTML)
  try {
    targetElement = container.querySelector(`[name="${targetId}"]`)
    if (targetElement) {
      return targetElement
    }
  } catch (e) {
    // console.warn(`Failed to query with name attribute: [name="${targetId}"]`, e)
  }

  return null
}

// Helper function to get XPath of an element for position restoration
const getElementXPath = (element) => {
  if (!element) return null

  const getPathSegment = (el) => {
    if (!el.parentNode) return ''

    let index = 1
    const siblings = el.parentNode.childNodes
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i]
      if (sibling === el) {
        break
      }
      if (sibling.nodeType === 1 && sibling.nodeName === el.nodeName) {
        index++
      }
    }
    return `${el.nodeName.toLowerCase()}[${index}]`
  }

  const path = []
  let current = element

  while (current && current.nodeType === 1) {
    // Stop at the scroll container or content container (the element we search from during restoration)
    if (current.hasAttribute && (current.hasAttribute('data-scroll-container') || current.hasAttribute('data-popup-content'))) {
      break
    }
    path.unshift(getPathSegment(current))
    current = current.parentNode
  }

  return path.length > 0 ? '//' + path.join('/') : null
}

// Helper function to find element by XPath within a container
const findElementByXPath = (container, xpath) => {
  if (!container || !xpath) return null

  try {
    // Evaluate XPath relative to the container
    const result = document.evaluate(
      xpath,
      container,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    )
    return result.singleNodeValue
  } catch (e) {
    console.warn('Failed to find element by XPath:', e)
    return null
  }
}

// Helper to get the topmost visible element in a scrollable container
const getTopmostVisibleElement = (container) => {
  if (!container) return null

  const containerRect = container.getBoundingClientRect()

  // Get all elements that could be "readable" content
  const candidates = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th, div, section, article, span, header')

  let bestMatch = null
  let bestScore = Infinity

  for (const el of candidates) {
    const rect = el.getBoundingClientRect()
    // Skip if element is too small (likely decorative)
    if (rect.height < 10) continue

    // Calculate how close the top of this element is to the top of the visible area
    const distanceFromTop = rect.top - containerRect.top

    // We want elements that are just at or slightly below the top of the visible area
    if (distanceFromTop >= -5 && distanceFromTop < bestScore) {
      bestScore = distanceFromTop
      bestMatch = el
    }
  }

  return bestMatch
}

// Global popup state management
// Note: These references are intentionally module-level for cross-component communication
// Components using these should clean up their references on unmount
let popupManager = {
  mainPopup: null,
  nestedPopup: null,
  setMainPopup: null,
  setNestedPopup: null,
  mainPopupNavigate: null, // Callback to navigate within existing MainPopup, preserving history
  originContext: null, // Stores the first document's content and position for back navigation
}

// Helper to clean up popup manager references (call on component unmount)
export const cleanupPopupManager = () => {
  popupManager.mainPopup = null
  popupManager.nestedPopup = null
  popupManager.originContext = null
  // Don't null out setters - they may still be valid from other instances
}

// ✅ Helper function to parse document URL and extract type and slug
const parseDocumentUrl = (url) => {
  try {
    let pathname = url
    let hash = ''

    if (url.startsWith('http')) {
      const urlObj = new URL(url)
      pathname = urlObj.pathname
      hash = urlObj.hash
    } else if (url.includes('#')) {
      const parts = url.split('#')
      pathname = parts[0]
      hash = '#' + parts[1]
    }

    const cleanPath = pathname.replace(/^\/+|\/+$/g, '')
    const segments = cleanPath.split('/').filter(s => s.length > 0)

    // Map route prefixes to document types
    const routeTypeMap = {
      'articles': 'article',
      'decisions': 'decision',
      'guidances': 'guide',
      'tax-treaties': 'taxTreaty',
    }

    let documentType = 'guide'
    let slug = ''

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i].toLowerCase()
      if (routeTypeMap[segment]) {
        documentType = routeTypeMap[segment]
        if (i + 1 < segments.length) {
          slug = segments[segments.length - 1]
        }
        break
      }
    }

    if (!slug && segments.length > 0) {
      slug = segments[segments.length - 1]
    }

    return {
      documentType,
      slug,
      hash: hash.startsWith('#') ? hash.substring(1) : hash,
    }
  } catch (error) {
    console.error('Error parsing document URL:', error)
    return null
  }
}

// ✅ Helper function to check if URL is a same-origin document link (that should open in popup)
const isSameOriginDocumentLink = (url) => {
  // Type check - ensure url is a string
  if (!url || typeof url !== 'string') return false
  if (url.startsWith('#')) return false

  // Exclude paths that should open in new tab, not popup
  // These are full page views that should not be rendered in a popup
  const excludedPaths = ['/laws/', '/search-across-law']
  const lowerUrl = url.toLowerCase()
  for (const path of excludedPaths) {
    if (lowerUrl.startsWith(path) || lowerUrl.includes(path)) {
      return false
    }
  }

  if (url.startsWith('/')) return true

  try {
    if (url.startsWith('http')) {
      const urlObj = new URL(url)
      // Also check excluded paths for full URLs
      for (const path of excludedPaths) {
        if (urlObj.pathname.toLowerCase().startsWith(path) ||
          urlObj.search.toLowerCase().includes(path.replace('/', ''))) {
          return false
        }
      }
      return urlObj.hostname === window.location.hostname
    }
  } catch {
    return false
  }

  // eslint-disable-next-line no-script-url
  return !url.startsWith('mailto:') &&
    !url.startsWith('tel:') &&
    !url.startsWith('javascript:') &&
    !url.startsWith('data:')
}

// ✅ React Portal Nested Popup Component
const NestedPopup = ({
  targetId,
  fullDocumentContent,
  documentTitle,
  showSnackbar,
  baseUrl,
  onClose,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const contentRef = React.useRef(null)
  // in guides, we are using #gtlnotes pattern for GTL Note, but in treaties we are using #footnote pattern
  const titleText = targetId.startsWith('#footnote')
    ? 'GTL Note'
    : targetId.startsWith('#gtlnotes')
      ? 'GTL Note'
      : 'Footnote'
  const cleanTargetId = targetId.startsWith('#')
    ? targetId.substring(1)
    : targetId

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc, true)
    return () => document.removeEventListener('keydown', handleEsc, true)
  }, [onClose])

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowBackToTop(contentRef.current.scrollTop > 300)
      }
    }

    const container = contentRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Find target content - sanitize HTML to prevent XSS
  let targetContent = null
  if (fullDocumentContent) {
    const tempDiv = document.createElement('div')
    // Sanitize before assigning to innerHTML to prevent XSS
    tempDiv.innerHTML = DOMPurify.sanitize(fullDocumentContent, {
      ADD_ATTR: ['target', 'rel', 'class', 'id', 'name', 'href'],
      ADD_TAGS: ['mark'],
    })
    const targetElement = findElementById(tempDiv, cleanTargetId)
    if (targetElement) {
      targetContent = targetElement.outerHTML
    }
  }

  return createPortal(
    <div
      id='nested-popup-container'
      className='nested-popup-overlay'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 15000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div
        className='nested-popup-container'
        style={{
          background: '#232536',
          borderRadius: '12px',
          maxWidth: '85%',
          maxHeight: '85%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          border: '3px solid #fff',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className='nested-popup-header gtl-notes-accordion-summary'
          style={{
            padding: '16px 20px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            flexShrink: 0,
          }}
        >
          <h3
            className='nested-popup-title'
            style={{
              margin: 0,
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {titleText}
          </h3>
          <button
            className='nested-popup-close-button'
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontSize: '28px',
              cursor: 'pointer',
              color: 'white',
              padding: 0,
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)',
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className='nested-popup-content gtl-notes-accordion-details'
          style={{
            padding: '20px',
            overflowY: 'auto',
            flex: 1,
            lineHeight: 1.6,
            background: 'white',
            color: '#333',
            position: 'relative',
            overscrollBehavior: 'contain', // Prevent scroll chaining to background
          }}
        >
          {targetContent ? (
            <div className='gtl-notes-content'>
              <HtmlContentRenderer
                content={targetContent}
                fullDocumentContent={fullDocumentContent}
                documentTitle={documentTitle}
                showSnackbar={showSnackbar}
                baseUrl={baseUrl}
                isNestedPopup={true}
              />
            </div>
          ) : (
            <p style={{ color: '#666' }}>
              Content for section "{cleanTargetId}" not found.
            </p>
          )}

          {/* Back to top button */}
          {showBackToTop && (
            <button
              className='nested-popup-back-to-top'
              onClick={scrollToTop}
              style={{
                position: 'sticky',
                bottom: '20px',
                float: 'right',
                marginTop: '-60px',
                zIndex: 1400,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#232536',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              ↑
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

// ✅ React Portal Main Popup Component
// Enhanced: handles both inline content (targetId + fullDocumentContent) 
// and external document fetching (documentUrl)
const MainPopup = ({
  targetId = '',
  fullDocumentContent,
  documentTitle: initialTitle,
  showSnackbar,
  baseUrl,
  onClose,
  documentUrl = null,
  initialScrollPosition = null, // For restoring position when returning to origin document
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [loading, setLoading] = useState(!!documentUrl)
  const [error, setError] = useState(null)
  const [fetchedContent, setFetchedContent] = useState(null)
  const [fetchedTitle, setFetchedTitle] = useState(null)
  const [currentUrl, setCurrentUrl] = useState(documentUrl)
  const [documentType, setDocumentType] = useState(null)
  const [navigationHistory, setNavigationHistory] = useState(() => {
    // Initialize history from origin context if present (allows back to first document)
    // Note: Don't clear originContext here - it will be cleared in useEffect after mount
    if (popupManager.originContext) {
      const origin = popupManager.originContext
      return [{
        url: null, // Special marker for inline content origin
        title: origin.title,
        fullDocumentContent: origin.fullDocumentContent,
        targetId: origin.targetId,
        baseUrl: origin.baseUrl,
        scrollPosition: origin.scrollPosition,
        elementXPath: origin.elementXPath,
        offsetFromElement: origin.offsetFromElement,
        isOrigin: true // Flag to identify this as origin document
      }]
    }
    return []
  }) // Track visited docs

  // Clear originContext after component mounts to prevent it from being used again
  // This is done in useEffect to avoid React StrictMode double-initialization issues
  useEffect(() => {
    if (popupManager.originContext) {
      popupManager.originContext = null
    }
  }, []) // Empty deps - runs once on mount
  const [currentHash, setCurrentHash] = useState(() => {
    // Initialize from targetId or hash in documentUrl
    if (targetId) {
      return targetId.startsWith('#') ? targetId : `#${targetId}`
    }
    if (documentUrl && documentUrl.includes('#')) {
      return `#${documentUrl.split('#')[1]}`
    }
    return ''
  })
  const contentRef = React.useRef(null)

  // Max history size for performance
  const MAX_HISTORY_SIZE = 25

  // Determine display content and title
  const displayContent = documentUrl ? fetchedContent : fullDocumentContent
  // When loading external documents, avoid showing stale titles - show placeholder until fetched
  const displayTitle = documentUrl
    ? (loading ? 'Loading...' : (fetchedTitle || initialTitle || 'Document'))
    : (initialTitle || 'Document Section')
  const effectiveBaseUrl = documentUrl ? currentUrl : baseUrl

  const cleanTargetId = targetId?.startsWith('#')
    ? targetId.substring(1)
    : (targetId || '')

  // Derive documentId for annotations
  // For external documents: extract slug from URL (e.g., /en/law/article/article-123 -> article-123)
  // For inline content: use baseUrl as identifier
  // eslint-disable-next-line no-unused-vars
  const annotationDocumentId = useMemo(() => {
    if (currentUrl) {
      // Extract slug from URL path (last segment before hash or query)
      const urlPath = currentUrl.split('#')[0].split('?')[0]
      const segments = urlPath.split('/').filter(s => s)
      return segments[segments.length - 1] || 'popup-document'
    }
    if (baseUrl) {
      // For inline content, extract slug from baseUrl
      const segments = baseUrl.split('/').filter(s => s)
      return segments[segments.length - 1] || 'inline-document'
    }
    return 'popup-document'
  }, [currentUrl, baseUrl])

  // Determine annotation document type based on URL patterns
  // eslint-disable-next-line no-unused-vars
  const annotationDocumentType = useMemo(() => {
    const url = currentUrl || baseUrl || ''
    if (url.includes('/article/') || url.includes('/articles/')) return 'article'
    if (url.includes('/guideline/') || url.includes('/guidelines/')) return 'guideline'
    if (url.includes('/decision/') || url.includes('/decisions/')) return 'decision'
    if (url.includes('/circular/') || url.includes('/circulars/')) return 'circular'
    if (url.includes('/treaty/') || url.includes('/treaties/')) return 'treaty'
    return documentType || 'popup-document'
  }, [currentUrl, baseUrl, documentType])

  // Initialize annotation hook - COMMENTED OUT FOR TESTING
  // const {
  //   annotations,
  //   applyHighlights,
  //   ContextMenuComponent,
  //   TouchFabComponent,
  //   TooltipComponent,
  //   EditorDialogComponent,
  //   AnnotationStyles,
  // } = usePopupAnnotations({
  //   documentId: annotationDocumentId,
  //   documentType: annotationDocumentType,
  //   containerRef: contentRef,
  //   showSnackbar,
  //   enableAnnotations: true,
  // })
  // eslint-disable-next-line no-unused-vars
  const annotations = []
  // eslint-disable-next-line no-unused-vars
  const applyHighlights = () => {}
  const ContextMenuComponent = null
  const TouchFabComponent = null
  const TooltipComponent = null
  const EditorDialogComponent = null
  const AnnotationStyles = null

  // Apply highlights when content is loaded and annotations change
  // useEffect(() => {
  //   if (displayContent && annotations.length > 0 && !loading) {
  //     // Small delay to ensure DOM is ready
  //     const timeoutId = setTimeout(() => {
  //       applyHighlights()
  //     }, 200)
  //     return () => clearTimeout(timeoutId)
  //   }
  // }, [displayContent, annotations, loading, applyHighlights])

  // Dynamic CSS loading based on document type
  // Uses ref to track CSS load state and prevent race conditions
  useEffect(() => {
    if (!documentType) return

    const environment = process.env.REACT_APP_ENVIRONMENT || 'dev'
    const cssId = 'popup-document-css'
    let isMounted = true // Track if component is still mounted

    // Map document types to CSS file names
    const cssFileMap = {
      'decision': 'decision.css',
      'guide': 'guide.css',
      'article': 'article.css',
      'taxTreaty': 'dtaa.css',
    }

    const cssFile = cssFileMap[documentType]
    if (!cssFile) return

    // Remove any existing popup CSS first
    const existingLink = document.getElementById(cssId)
    if (existingLink) {
      existingLink.remove()
    }

    // Create and append new CSS link
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/${environment}/${cssFile}`
    link.id = cssId

    // Track load state to handle race conditions
    link.onload = () => {
      if (!isMounted) {
        // Component unmounted before CSS loaded - clean up
        link.remove()
      }
    }

    document.head.appendChild(link)

    // Cleanup on unmount or when document type changes
    return () => {
      isMounted = false
      document.getElementById(cssId)?.remove()
    }
  }, [documentType])

  // Fetch external document content when documentUrl is provided
  useEffect(() => {
    if (!currentUrl) return

    const fetchDocument = async () => {
      setLoading(true)
      setError(null)

      try {
        const parsed = parseDocumentUrl(currentUrl)

        if (!parsed || !parsed.slug) {
          throw new Error('Could not parse document URL')
        }

        const { documentType: parsedDocType } = parsed

        // Set document type for CSS loading
        setDocumentType(parsedDocType)

        // Map document type to API entity type
        const entityTypeMap = {
          'guide': 'guidelines',
          'decision': 'decisions',
          'article': 'articles',
          'taxTreaty': 'tax-treaties',
        }

        // eslint-disable-next-line no-unused-vars
        const entityType = entityTypeMap[parsedDocType] || 'guidelines'
        // const result = await apiService.getEntityBySlug(entityType, slug)
        // COMMENTED OUT FOR TESTING - apiService not available
        throw new Error('API Service not available in test mode')

        // if (result) {
        //   // Check all possible content field names
        //   // const content = result.content || result.articleContent || result.guideContent || result.body || result.treatyContent || ''
        //   // const title = result.title || result.articleTitle || result.guideName || result.name || result.treatyTitle || initialTitle || 'Document'

        //   const content = result.content || ''
        //   const title = result.title || ''

        //   setFetchedContent(content)
        //   setFetchedTitle(title)

        //   // Scroll to hash fragment if present
        //   if (hash) {
        //     setTimeout(() => {
        //       if (contentRef.current) {
        //         const targetElement = findElementById(contentRef.current, hash)
        //         if (targetElement) {
        //           targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        //           applyHighlighting(targetElement, 3000)
        //         }
        //       }
        //     }, 200)
        //   }
        // } else {
        //   throw new Error('Document not found')
        // }
      } catch (err) {
        console.error('Error fetching document:', err)
        setError(err.message || 'Failed to load document')
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [currentUrl, initialTitle])


  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowBackToTop(contentRef.current.scrollTop > 300)
      }
    }

    const container = contentRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, []) // Empty dependency - contentRef is stable

  // Scroll to target after render (for non-external content)
  useEffect(() => {
    if (documentUrl || !cleanTargetId) return

    setTimeout(() => {
      if (contentRef.current && cleanTargetId) {
        const targetElement = findElementById(contentRef.current, cleanTargetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          const success = applyHighlighting(targetElement, 3000)
          if (success && showSnackbar) {
            showSnackbar(`Scrolled to section: ${cleanTargetId}`, 'success')
          }
        }
      }
    }, 100)
  }, [cleanTargetId, showSnackbar, documentUrl])

  // Restore scroll position when returning to origin document (via initialScrollPosition prop)
  // Uses a ref to prevent React StrictMode double-execution issues
  const positionRestoredRef = React.useRef(false)

  useEffect(() => {
    if (!initialScrollPosition || documentUrl) return

    // Prevent double execution in StrictMode
    if (positionRestoredRef.current) {
      return
    }

    const restorePosition = (attempt = 0) => {
      if (attempt > 10) {
        return
      }

      if (!contentRef.current) {
        setTimeout(() => restorePosition(attempt + 1), 100)
        return
      }

      // Mark as restored to prevent StrictMode double-execution
      positionRestoredRef.current = true

      // Use scrollPosition directly - it's the exact scroll value that was captured
      // This is more reliable than recalculating from XPath which can cause drift
      if (initialScrollPosition.scrollPosition !== undefined) {
        contentRef.current.scrollTo({
          top: initialScrollPosition.scrollPosition,
          behavior: 'instant'
        })
        return
      }

      // Fallback to XPath calculation if scrollPosition not available
      if (initialScrollPosition.elementXPath) {
        const targetElement = findElementByXPath(contentRef.current, initialScrollPosition.elementXPath)

        if (targetElement) {
          const containerRect = contentRef.current.getBoundingClientRect()
          const targetRect = targetElement.getBoundingClientRect()
          const scrollOffset = targetRect.top - containerRect.top + contentRef.current.scrollTop - (initialScrollPosition.offsetFromElement || 0)

          contentRef.current.scrollTo({
            top: Math.max(0, scrollOffset),
            behavior: 'instant'
          })
          return
        }
      }

      // Content might not be ready yet, retry
      positionRestoredRef.current = false // Allow retry
      setTimeout(() => restorePosition(attempt + 1), 100)
    }

    // Start restoration after a short delay to allow content to render
    setTimeout(() => restorePosition(), 50)
  }, [initialScrollPosition, documentUrl])

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle navigation within popup (for document links clicked inside)
  // Uses functional state updates for proper batching
  // Enhanced: stores scroll position and XPath for position restoration
  const handleInternalNavigation = useCallback((newUrl) => {
    // Skip if same URL or no current URL
    if (!currentUrl || newUrl === currentUrl) return

    // Capture current scroll position and topmost visible element's XPath
    let scrollPosition = 0
    let elementXPath = null
    let offsetFromElement = 0

    if (contentRef.current) {
      scrollPosition = contentRef.current.scrollTop
      const topmostElement = getTopmostVisibleElement(contentRef.current)
      if (topmostElement) {
        elementXPath = getElementXPath(topmostElement)
        // Store offset from the top of the element to the visible area
        const elementRect = topmostElement.getBoundingClientRect()
        const containerRect = contentRef.current.getBoundingClientRect()
        offsetFromElement = elementRect.top - containerRect.top
      }
    }

    // Batch all state updates together
    setNavigationHistory(prev => {
      // Prevent consecutive duplicates
      const lastEntry = prev[prev.length - 1]
      if (lastEntry?.url === currentUrl) {
        return prev // Skip if same as last entry
      }

      // Limit history size for performance
      const newHistory = [...prev, {
        url: currentUrl,
        title: displayTitle,
        scrollPosition,
        elementXPath,
        offsetFromElement
      }]
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift() // Remove oldest entry
      }
      return newHistory
    })

    // Update URL and reset content in a batch
    setCurrentUrl(newUrl)
    // Extract and set hash from new URL, or reset if no hash
    setCurrentHash(newUrl.includes('#') ? `#${newUrl.split('#')[1]}` : '')
    setFetchedContent(null)
    setFetchedTitle(null)

    // Scroll reset is a side effect, not state
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [currentUrl, displayTitle, MAX_HISTORY_SIZE])

  // Handle back navigation with position restoration
  // Uses stored XPath to restore exact reading position
  // Enhanced: supports returning to origin document (inline content)
  const handleBack = useCallback(() => {
    if (navigationHistory.length === 0) return false

    const previousEntry = navigationHistory[navigationHistory.length - 1]

    // Remove the last entry from history
    setNavigationHistory(prev => prev.slice(0, -1))

    // Check if this is the origin document (inline content, not a URL)
    if (previousEntry.isOrigin) {
      // Close current popup and reopen with origin content
      if (popupManager.setMainPopup) {
        popupManager.setMainPopup(
          <MainPopup
            targetId={previousEntry.targetId}
            fullDocumentContent={previousEntry.fullDocumentContent}
            documentTitle={previousEntry.title}
            showSnackbar={showSnackbar}
            baseUrl={previousEntry.baseUrl}
            onClose={() => popupManager.setMainPopup(null)}
            initialScrollPosition={{
              scrollPosition: previousEntry.scrollPosition,
              elementXPath: previousEntry.elementXPath,
              offsetFromElement: previousEntry.offsetFromElement
            }}
          />
        )
      }
      return true
    }

    // Navigate to previous URL - strip hash to prevent auto-scroll conflict
    // We restore position via XPath, so hash-based scrolling would interfere
    const urlWithoutHash = previousEntry.url.split('#')[0]
    setCurrentUrl(urlWithoutHash)
    setFetchedContent(null)
    setFetchedTitle(null)

    // Restore scroll position after content loads
    // Using a slight delay to allow DOM to update
    const restorePosition = () => {
      if (!contentRef.current) return

      // PRIORITY 1: Use direct scrollPosition (most reliable - exact captured value)
      if (previousEntry.scrollPosition !== undefined && previousEntry.scrollPosition !== null) {
        contentRef.current.scrollTo({
          top: previousEntry.scrollPosition,
          behavior: 'instant'
        })
        return
      }

      // PRIORITY 2: Fall back to XPath if scrollPosition not available
      if (previousEntry.elementXPath) {
        const targetElement = findElementByXPath(contentRef.current, previousEntry.elementXPath)
        if (targetElement) {
          // Scroll to element, accounting for the original offset
          const containerRect = contentRef.current.getBoundingClientRect()
          const targetRect = targetElement.getBoundingClientRect()
          const scrollOffset = targetRect.top - containerRect.top + contentRef.current.scrollTop - (previousEntry.offsetFromElement || 0)

          contentRef.current.scrollTo({
            top: Math.max(0, scrollOffset),
            behavior: 'instant'
          })
          return
        }
      }
    }

    // Wait for content to be fetched and rendered, then restore position
    // Use multiple attempts with increasing delays for reliability
    const attemptRestore = (attempt = 0) => {
      if (attempt > 5) return // Max 5 attempts

      setTimeout(() => {
        if (contentRef.current && contentRef.current.querySelector('*')) {
          restorePosition()
        } else if (attempt < 5) {
          attemptRestore(attempt + 1)
        }
      }, attempt === 0 ? 100 : 200 * attempt)
    }

    attemptRestore()
    return true
  }, [navigationHistory])

  // Handle Escape and Backspace keys for navigation (only if no nested popup)
  // - If there's navigation history: go back to previous document at exact position
  // - If no history: close the popup (original behavior)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if nested popup is open - let it handle its own keys
      if (popupManager.nestedPopup) return

      // Skip if user is typing in an input field
      const activeElement = document.activeElement
      if (activeElement && (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable)) {
        return
      }

      // Handle Escape or Backspace
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault()
        e.stopPropagation()

        // If there's navigation history, go back
        if (navigationHistory.length > 0) {
          handleBack()
        } else {
          // No history, close the popup
          onClose()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleBack, navigationHistory.length, onClose])

  // Register navigation callback to popupManager so NestedPopup can navigate 
  // within this MainPopup instance, preserving navigation history
  useEffect(() => {
    // Only register if this is the active popup with documentUrl (can navigate)
    if (documentUrl) {
      popupManager.mainPopupNavigate = handleInternalNavigation
    }

    // Cleanup on unmount
    return () => {
      if (popupManager.mainPopupNavigate === handleInternalNavigation) {
        popupManager.mainPopupNavigate = null
      }
    }
  }, [handleInternalNavigation, documentUrl])

  // Memoize isMobile to prevent unnecessary re-renders
  // Also add resize listener for responsive behavior
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768 + 1
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = useMemo(() => windowWidth <= 768, [windowWidth])
  const canGoBack = navigationHistory.length > 0

  return createPortal(
    <>
      <div
        id='main-popup-container'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box',
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '8px',
            width: documentUrl ? (isMobile ? '95%' : '85%') : '90%',
            // maxWidth: documentUrl ? '1200px' : '90%',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              background: '#f5f5f5',
              flexShrink: 0,
              gap: '12px',
            }}
          >
            {/* Back button - only show when there's history and we're in document mode */}
            {canGoBack && documentUrl && (
              <Tooltip title="Go back" arrow>
                <IconButton
                  onClick={handleBack}
                  size="small"
                  sx={{
                    color: '#666',
                    marginRight: '8px',
                    flexShrink: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      color: '#232536',
                    },
                  }}
                >
                  <ArrowBackRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <h3
              style={{
                margin: 0,
                color: '#232536',
                fontSize: '1.1rem',
                fontWeight: 600,
                flex: 1,
                lineHeight: 1.4,
              }}
            >
              {displayTitle.replace(/<[^>]*>/g, '') || 'Document Section'}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <Tooltip title="Open in new tab" arrow>
                <IconButton
                  onClick={() => {
                    let fullUrl = effectiveBaseUrl || currentUrl || ''
                    // Remove any existing hash from the base URL to avoid duplication
                    const urlWithoutHash = fullUrl.split('#')[0]
                    if (urlWithoutHash && !urlWithoutHash.startsWith('http')) {
                      fullUrl = `${window.location.origin}${urlWithoutHash.startsWith('/') ? '' : '/'}${urlWithoutHash}`
                    } else {
                      fullUrl = urlWithoutHash
                    }
                    // Append current hash if present
                    if (currentHash) {
                      fullUrl = `${fullUrl}${currentHash}`
                    }
                    if (fullUrl) {
                      openDocumentInTab(fullUrl, displayTitle, showSnackbar)
                    }
                  }}
                  size="small"
                  sx={{
                    color: '#666',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      color: '#232536',
                    },
                  }}
                >
                  <OpenInNewRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            data-scroll-container="true"
            style={{
              padding: '20px',
              overflowY: 'auto',
              flex: 1,
              lineHeight: 1.6,
              position: 'relative',
              overscrollBehavior: 'contain', // Prevent scroll chaining to background
            }}
          >
            {loading ? (
              <div style={{ padding: '16px' }}>
                <Skeleton variant='rectangular' width='100%' height={200} sx={{ marginBottom: '16px', borderRadius: '4px' }} />
                <Skeleton variant='text' width='60%' height={32} sx={{ marginBottom: '8px' }} />
                <Skeleton variant='text' width='80%' height={20} sx={{ marginBottom: '8px' }} />
                <Skeleton variant='text' width='90%' height={20} sx={{ marginBottom: '8px' }} />
                <Skeleton variant='text' width='70%' height={20} sx={{ marginBottom: '16px' }} />
                {/* <Skeleton variant='rectangular' width='100%' height={150} sx={{ borderRadius: '4px' }} /> */}
              </div>
            ) : error ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#d32f2f'
              }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                  Failed to load document
                </p>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
                  {error}
                </p>
                <button
                  onClick={() => {
                    let fullUrl = currentUrl || ''
                    if (fullUrl && !fullUrl.startsWith('http')) {
                      fullUrl = `${window.location.origin}${fullUrl.startsWith('/') ? '' : '/'}${fullUrl}`
                    }
                    if (fullUrl) window.open(fullUrl, '_blank')
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#232536',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Open in new tab
                </button>
              </div>
            ) : displayContent ? (
              <>
                <HtmlContentRenderer
                  content={displayContent}
                  fullDocumentContent={displayContent}
                  documentTitle={displayTitle}
                  showSnackbar={showSnackbar}
                  baseUrl={effectiveBaseUrl}
                  isNestedPopup={false}
                  onNavigate={documentUrl ? handleInternalNavigation : undefined}
                  onHashChange={setCurrentHash}
                />

                {/* Back to top button */}
                {showBackToTop && (
                  <button
                    onClick={scrollToTop}
                    style={{
                      position: 'sticky',
                      bottom: '20px',
                      float: 'right',
                      marginTop: '-60px',
                      zIndex: 1400,
                      ...(isMobile
                        ? {
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          fontSize: '20px',
                        }
                        : {
                          padding: '8px 16px',
                          borderRadius: '28px',
                          fontSize: '14px',
                        }),
                      backgroundColor: '#232536',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                      gap: isMobile ? 0 : '8px',
                    }}
                  >
                    {isMobile ? '↑' : '↑ Back to Top'}
                  </button>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No content available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Annotation UI Components */}
      {AnnotationStyles}
      {ContextMenuComponent}
      {TouchFabComponent}
      {TooltipComponent}
      {EditorDialogComponent}
    </>,
    document.body
  )
}

// ✅ HTML Content Renderer Component
const HtmlContentRenderer = ({
  content,
  fullDocumentContent,
  documentTitle,
  showSnackbar,
  baseUrl,
  isNestedPopup = false,
  onNavigate = null, // callback for navigating to document links within popup
  onHashChange = null, // NEW: callback to notify parent of hash navigation
}) => {
  // Helper function to handle navigation between popups
  const handlePopupNavigation = (
    targetId,
    fullDocumentContent,
    documentTitle,
    showSnackbar,
    baseUrl
  ) => {
    return new Promise((resolve) => {
      // Close nested popup first if it exists
      if (popupManager.nestedPopup) {
        popupManager.setNestedPopup(null)
      }

      // Small delay to ensure nested popup closes smoothly
      setTimeout(() => {
        // Check if main popup exists
        const mainPopupContainer = document.getElementById(
          'main-popup-container'
        )

        if (mainPopupContainer && popupManager.mainPopup) {
          // Main popup exists - try to navigate within it
          const mainPopupContent = mainPopupContainer.querySelector(
            '[data-popup-content]'
          )
          const targetInMain = findElementById(
            mainPopupContent || mainPopupContainer,
            targetId
          )

          if (targetInMain) {
            targetInMain.scrollIntoView({ behavior: 'smooth', block: 'start' })
            const success = applyHighlighting(targetInMain, 3000)

            if (success && showSnackbar) {
              showSnackbar(`Navigated to section: ${targetId}`, 'success')
            }
            resolve({ success: true, action: 'scrolled_in_main' })
          } else {
            // Target not found in main popup either
            if (showSnackbar) {
              showSnackbar(
                `Section "${targetId}" not found in document`,
                'warning'
              )
            }
            resolve({ success: false, action: 'not_found' })
          }
        } else {
          // No main popup - create one
          if (popupManager.setMainPopup) {
            popupManager.setMainPopup(
              <MainPopup
                targetId={targetId}
                fullDocumentContent={fullDocumentContent}
                documentTitle={documentTitle}
                showSnackbar={showSnackbar}
                baseUrl={baseUrl}
                onClose={() => popupManager.setMainPopup(null)}
              />
            )

            if (showSnackbar) {
              showSnackbar(
                `Opened document and navigated to: ${targetId}`,
                'info'
              )
            }
            resolve({ success: true, action: 'created_main_popup' })
          } else {
            resolve({ success: false, action: 'no_popup_manager' })
          }
        }
      }, 150) // Slightly longer delay for better UX
    })
  }

  const handleLinkClick = useCallback(
    async (e, href) => {
      // Handle special URL schemes
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('sms:')
      ) {
        if (showSnackbar) {
          const scheme = href.split(':')[0]
          showSnackbar(`Opening ${scheme} link`, 'info')
        }
        return
      }

      e.preventDefault()
      e.stopPropagation()

      if (href.startsWith('#')) {
        // Check if it's a special bookmark/note link
        if (isSpecialBookmarkLink(href)) {
          popupManager.setNestedPopup(
            <NestedPopup
              targetId={href}
              fullDocumentContent={fullDocumentContent}
              documentTitle={documentTitle}
              showSnackbar={showSnackbar}
              baseUrl={baseUrl}
              onClose={() => popupManager.setNestedPopup(null)}
            />
          )
          return
        }

        // Regular internal link handling
        const targetId = href.substring(1)
        const popup = e.target.closest(
          '#main-popup-container, #nested-popup-container'
        )

        if (popup) {
          // We're inside a popup
          const popupContent = popup.querySelector('[data-popup-content]')
          const targetElement = findElementById(popupContent || popup, targetId)

          if (targetElement) {
            // Target found in current popup
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            const success = applyHighlighting(targetElement, 3000)
            if (success && showSnackbar) {
              showSnackbar(`Navigated to section: ${targetId}`, 'success')
            }
            // Notify parent of hash change for "Open in new tab" functionality
            if (onHashChange) {
              onHashChange(`#${targetId}`)
            }
          } else {
            // Target not found - use the navigation helper
            const isNestedPopup = popup.id === 'nested-popup-container'

            if (isNestedPopup) {
              // Handle the cross-popup navigation
              await handlePopupNavigation(
                targetId,
                fullDocumentContent,
                documentTitle,
                showSnackbar,
                baseUrl
              )
            } else {
              // We're in main popup but target not found
              if (showSnackbar) {
                showSnackbar(`Section "${targetId}" not found`, 'warning')
              }
            }
          }
        } else {
          // Not in a popup - create main popup
          if (popupManager.setMainPopup) {
            popupManager.setMainPopup(
              <MainPopup
                targetId={targetId}
                fullDocumentContent={fullDocumentContent}
                documentTitle={documentTitle}
                showSnackbar={showSnackbar}
                baseUrl={baseUrl}
                onClose={() => popupManager.setMainPopup(null)}
              />
            )

            if (showSnackbar) {
              showSnackbar('Section opened in popup', 'info')
            }
          }
        }
      } else if (isExternalUrl(href)) {
        // Handle external links - open in new tab
        const linkText = e.target.textContent?.trim() || 'External Link'
        openUrlWithFocusManagement(href, linkText, showSnackbar)
      } else if (isSameOriginDocumentLink(href)) {
        // Handle internal document links - open in MainPopup
        let documentPath = href
        if (!href.startsWith('/')) {
          const currentBasePath = baseUrl || window.location.pathname
          const basePath = currentBasePath.substring(0, currentBasePath.lastIndexOf('/') + 1)
          documentPath = basePath + href
        }

        const linkText = e.target.textContent?.trim() || 'Document'


        // If we have onNavigate callback (we're inside MainPopup), use it for in-popup navigation
        if (onNavigate) {
          onNavigate(documentPath)
          if (showSnackbar) {
            showSnackbar('Loading document...', 'info')
          }
        } else if (popupManager.mainPopupNavigate) {
          // We're in NestedPopup but MainPopup exists - use its navigation to preserve history
          // Close any existing nested popup first (footnotes/GTL notes)
          if (popupManager.setNestedPopup) {
            popupManager.setNestedPopup(null)
          }
          popupManager.mainPopupNavigate(documentPath)
          if (showSnackbar) {
            showSnackbar('Loading document...', 'info')
          }
        } else if (popupManager.setMainPopup) {
          // We're either in an inline-content MainPopup OR in a NestedPopup on top of MainPopup
          // Store origin context before navigating to preserve back navigation

          // Check if we're inside MainPopup directly (clicking from MainPopup content)
          let popup = e.target.closest('#main-popup-container')

          // If not found (e.g., clicking from NestedPopup), check if MainPopup exists in DOM
          if (!popup) {
            popup = document.getElementById('main-popup-container')
          }

          if (popup) {
            // Find the scroll container using data attribute (most reliable)
            const scrollContainer = popup.querySelector('[data-scroll-container]')

            let scrollPosition = 0
            let elementXPath = null
            let offsetFromElement = 0

            if (scrollContainer) {
              scrollPosition = scrollContainer.scrollTop
              const topmostElement = getTopmostVisibleElement(scrollContainer)
              if (topmostElement) {
                elementXPath = getElementXPath(topmostElement)
                const elementRect = topmostElement.getBoundingClientRect()
                const containerRect = scrollContainer.getBoundingClientRect()
                offsetFromElement = elementRect.top - containerRect.top
              }
            }

            // Store origin context for back navigation
            popupManager.originContext = {
              fullDocumentContent,
              title: documentTitle,
              targetId: '', // Will scroll to stored position, not a target
              baseUrl,
              scrollPosition,
              elementXPath,
              offsetFromElement
            }
          }

          // Close any existing nested popup first (footnotes/GTL notes)
          if (popupManager.setNestedPopup) {
            popupManager.setNestedPopup(null)
          }

          // Open in MainPopup with documentUrl
          // Use key prop to force React to create a fresh component instance
          popupManager.setMainPopup(
            <MainPopup
              key={`doc-${documentPath}-${Date.now()}`}
              documentUrl={documentPath}
              documentTitle={linkText}
              showSnackbar={showSnackbar}
              onClose={() => popupManager.setMainPopup(null)}
            />
          )
        } else {
          // Fallback to new tab
          const fullUrl = documentPath.startsWith('/')
            ? `${window.location.origin}${documentPath}`
            : documentPath
          openUrlWithFocusManagement(fullUrl, linkText, showSnackbar)
        }
      } else {
        // Other links - open in new tab
        const linkText = e.target.textContent?.trim() || 'Link'
        const fullUrl = href.startsWith('/')
          ? `${window.location.origin}${href}`
          : href
        openUrlWithFocusManagement(fullUrl, linkText, showSnackbar)
      }
    },
    [fullDocumentContent, documentTitle, showSnackbar, baseUrl, onNavigate, onHashChange]
  )

  // Sanitize and parse HTML
  const cleanHtml = DOMPurify.sanitize(content || '', {
    ADD_ATTR: ['target', 'rel', 'class', 'id', 'name', 'href'],
    ADD_TAGS: ['mark'],
  })
  const parseStyleString = (styleStr) => {
    if (!styleStr) return {}
    return styleStr.split(';').reduce((acc, style) => {
      const [key, value] = style.split(':').map((s) => s.trim())
      if (key && value) {
        // Convert kebab-case to camelCase for React
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        acc[camelKey] = value
      }
      return acc
    }, {})
  }

  const parsedContent = parse(cleanHtml, {
    replace: (domNode) => {
      if (domNode.name === 'a' && domNode.attribs?.href) {
        const href = domNode.attribs.href
        const inlineStyle = parseStyleString(domNode.attribs.style)

        return (
          <a
            href={href}
            className={domNode.attribs.class}
            id={domNode.attribs.id}
            style={inlineStyle}
            onClick={(e) => handleLinkClick(e, href)}
            {...(isExternalUrl(href) &&
              !href.startsWith('mailto:') &&
              !href.startsWith('tel:') &&
              !href.startsWith('sms:')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {domNode.children?.map((child, index) =>
              parseChildNode(child, index)
            )}
          </a>
        )
      }
      return undefined
    },
  })

  return (
    <span className='html-content' data-popup-content>
      {parsedContent}
    </span>
  )
}

// ✅ Main Popup Manager Component
const PopupManager = () => {
  const [mainPopup, setMainPopup] = useState(null)
  const [nestedPopup, setNestedPopup] = useState(null)

  // Update global popup manager
  React.useEffect(() => {
    popupManager.mainPopup = mainPopup
    popupManager.nestedPopup = nestedPopup
    popupManager.setMainPopup = setMainPopup
    popupManager.setNestedPopup = setNestedPopup
  }, [mainPopup, nestedPopup])

  return (
    <>
      {mainPopup}
      {nestedPopup}
    </>
  )
}

// ✅ Hook to manage popups
export const usePopupManager = () => {
  const openMainPopup = useCallback(
    (targetId, fullDocumentContent, documentTitle, showSnackbar, baseUrl) => {
      if (popupManager.setMainPopup) {
        popupManager.setMainPopup(
          <MainPopup
            targetId={targetId}
            fullDocumentContent={fullDocumentContent}
            documentTitle={documentTitle}
            showSnackbar={showSnackbar}
            baseUrl={baseUrl}
            onClose={() => popupManager.setMainPopup(null)}
          />
        )
      }
    },
    []
  )

  const openNestedPopup = useCallback(
    (targetId, fullDocumentContent, documentTitle, showSnackbar, baseUrl) => {
      if (popupManager.setNestedPopup) {
        popupManager.setNestedPopup(
          <NestedPopup
            targetId={targetId}
            fullDocumentContent={fullDocumentContent}
            documentTitle={documentTitle}
            showSnackbar={showSnackbar}
            baseUrl={baseUrl}
            onClose={() => popupManager.setNestedPopup(null)}
          />
        )
      }
    },
    []
  )

  const closeAllPopups = useCallback(() => {
    if (popupManager.setMainPopup) popupManager.setMainPopup(null)
    if (popupManager.setNestedPopup) popupManager.setNestedPopup(null)
  }, [])

  return { openMainPopup, openNestedPopup, closeAllPopups }
}

/**
 * React component to render HTML content with proper link handling
 */
const HtmlContent = ({
  content,
  searchQuery,
  baseUrl,
  fullDocumentContent,
  documentTitle,
  showSnackbar,
}) => {
  // Apply highlighting to the content if searchQuery is provided
  const highlightedContent = searchQuery
    ? highlightText(content, searchQuery)
    : content

  // Handle hash fragment scrolling when the page loads
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const timer = setTimeout(() => {
        const hash = window.location.hash
        if (hash.startsWith('#')) {
          const targetId = hash.substring(1)
          const targetElement = findElementById(document, targetId)

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
            // console.log(`Scrolled to element: ${targetId}`)
          } else {
            // console.warn(`Target element not found: ${targetId}`)
          }
        }
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <span className='html-content'>
      <HtmlContentRenderer
        content={highlightedContent}
        fullDocumentContent={fullDocumentContent}
        documentTitle={documentTitle}
        showSnackbar={showSnackbar}
        baseUrl={baseUrl}
        isNestedPopup={false}
      />
      <PopupManager />
    </span>
  )
}

/**
 * Main export function that returns the HtmlContent component
 */
export const parseHtmlSanitizeAddTargetToLinks = (
  content,
  searchQuery,
  baseUrl,
  options = {}
) => {
  if (!content) return null

  const {
    fullDocumentContent = null,
    documentTitle = 'Document',
    showSnackbar = null,
  } = options

  return (
    <HtmlContent
      content={content}
      searchQuery={searchQuery}
      baseUrl={baseUrl}
      fullDocumentContent={fullDocumentContent}
      documentTitle={documentTitle}
      showSnackbar={showSnackbar}
    />
  )
}

// Maintain existing utility exports
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// Clean up function to clear opened tabs tracking
export const clearOpenedTabsTracking = () => {
  clearDocumentTabsTracking()
}

// Export the popup manager components
export { PopupManager }