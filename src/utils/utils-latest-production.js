import React, { useEffect } from 'react'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

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
  // Check if the URL starts with http://, https://, //, or a domain
  return /^(https?:\/\/|\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,})/i.test(
    url
  )
}

// Handle links that should open in a new tab (only bookmarkSection)
const handleNewTabLink = (domNode, sectionBaseUrl) => {
  const href = domNode.attribs.href // e.g., #bookmarkSection2.1 or https://testgcctaxlaws.com/decisions/...#bookmarkSection2

  return (
    <a
      href={href}
      className={domNode.attribs.class}
      id={domNode.attribs.id}
      onClick={(e) => {
        e.preventDefault()

        // Determine if this is an absolute URL or a relative hash
        let fullUrl

        if (href.startsWith('http') || href.startsWith('//')) {
          // If it's already an absolute URL, use it as is
          fullUrl = href
          console.log(`Opening absolute URL in new tab: ${fullUrl}`)
        } else if (href.startsWith('/')) {
          // If it's an absolute path (starts with /) but not a full URL
          // Use current origin + the absolute path
          fullUrl = `${window.location.origin}${href}`
          console.log(`Opening site-relative URL in new tab: ${fullUrl}`)
        } else {
          // It's a hash fragment, append to the section base URL
          if (sectionBaseUrl) {
            // If we have a base URL, use it
            fullUrl = `${sectionBaseUrl}${href}`
          } else {
            // Otherwise use the current page URL
            fullUrl = `${window.location.pathname}${href}`
          }
          console.log(`Opening hash fragment in new tab: ${fullUrl}`)
        }

        window.open(fullUrl, '_blank')
      }}
    >
      {domNode.children?.map((child, i) => parseChildNode(child, i))}
    </a>
  )
}

// Handle links that should scroll in the same tab (#bookmark, #gtlnotes, #linktogtl)
const handleSameTabLink = (domNode) => {
  const href = domNode.attribs.href // e.g., #bookmark1

  return (
    <a
      href={href}
      className={domNode.attribs.class}
      id={domNode.attribs.id}
      onClick={(e) => {
        e.preventDefault()

        // Handle absolute URLs vs hash fragments
        if (
          href.startsWith('http') ||
          href.startsWith('//') ||
          href.startsWith('/')
        ) {
          // If it's an absolute URL or absolute path, open in same tab
          window.location.href = href
          console.log(`Navigating to: ${href}`)
        } else {
          // It's a hash fragment, scroll in current page
          const targetId = href.substring(1) // Remove #
          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
            console.log(`Scrolled to: ${targetId}`)
          } else {
            console.warn(`Target not found: ${targetId}`)
          }
        }
      }}
    >
      {domNode.children?.map((child, i) => parseChildNode(child, i))}
    </a>
  )
}

/**
 * React component to render HTML content with proper link handling
 */
const HtmlContent = ({ content, searchQuery, baseUrl }) => {
  // Apply highlighting to the content if searchQuery is provided
  const highlightedContent = searchQuery
    ? highlightText(content, searchQuery)
    : content

  // Get base URL for section links - try from param first, then from localStorage, then current path
  let sectionBaseUrl = baseUrl

  if (
    !sectionBaseUrl &&
    typeof window !== 'undefined' &&
    typeof localStorage !== 'undefined'
  ) {
    try {
      sectionBaseUrl = localStorage.getItem('localURL')
    } catch (e) {
      console.error('Error accessing localStorage:', e)
    }
  }

  if (!sectionBaseUrl && typeof window !== 'undefined') {
    sectionBaseUrl = window.location.pathname
  }

  // Handle hash fragment scrolling when the page loads
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const hash = window.location.hash
        // Handle any type of bookmark hash
        if (
          hash.startsWith('#bookmark') ||
          hash.startsWith('#gtlnotes') ||
          hash.startsWith('#linktogtl')
        ) {
          const targetId = hash.substring(1) // Remove the # character
          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
            console.log(`Scrolled to element: ${targetId}`)
          } else {
            console.warn(`Target element not found: ${targetId}`)
          }
        }
      }, 300) // 300ms delay for DOM to be ready

      return () => clearTimeout(timer)
    }
  }, [])

  // Allow target, rel, class, id, name, and href attributes during sanitization
  const cleanHtml = DOMPurify.sanitize(highlightedContent, {
    ADD_ATTR: ['target', 'rel', 'class', 'id', 'name', 'href'],
    ADD_TAGS: ['mark'], // Explicitly allow mark tags
  })

  // Parse the sanitized HTML
  const parsedContent = parse(cleanHtml, {
    replace: (domNode) => {
      if (!domNode || !domNode.name) return

      // Convert <a name="bookmarkX"> to use id attribute instead
      if (
        domNode.name === 'a' &&
        domNode.attribs?.name &&
        !domNode.attribs.id
      ) {
        return (
          <a id={domNode.attribs.name}>
            {domNode.children?.map((child, i) => parseChildNode(child, i))}
          </a>
        )
      }

      // Handle any link with a href attribute
      if (domNode.name === 'a' && domNode.attribs?.href) {
        const href = domNode.attribs.href

        // Check if it's an absolute URL
        if (href.startsWith('http') || href.startsWith('//')) {
          // For absolute URLs with bookmarkSection, open in new tab
          if (href.includes('#bookmarkSection')) {
            return handleNewTabLink(domNode, null) // null because we don't need sectionBaseUrl for absolute URLs
          }
          // For all other absolute URLs, use default external link behavior
          return (
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {domNode.children?.map((child, i) => parseChildNode(child, i))}
            </a>
          )
        }

        // For relative paths (not starting with #)
        if (href.startsWith('/')) {
          // If it has a bookmarkSection hash, open in new tab
          if (href.includes('#bookmarkSection')) {
            return handleNewTabLink(domNode, null)
          }
          // Otherwise use default behavior
          return (
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {domNode.children?.map((child, i) => parseChildNode(child, i))}
            </a>
          )
        }

        // For hash fragments
        if (href.startsWith('#')) {
          // Check type of hash fragment
          if (href.includes('bookmarkSection') || href.includes('gtlnotes')) {
            return handleNewTabLink(domNode, sectionBaseUrl)
          } else if (href.includes('bookmark') || href.includes('linktogtl')) {
            return handleSameTabLink(domNode)
          }
        }
      }

      // Default behavior for all other elements
      return undefined // Let the parser handle it
    },
  })

  return <div className='html-content'>{parsedContent}</div>
}

/**
 * Main export function that returns the HtmlContent component
 */
export const parseHtmlSanitizeAddTargetToLinks = (
  content,
  searchQuery,
  baseUrl
) => {
  if (!content) return null
  return (
    <HtmlContent
      content={content}
      // searchQuery={searchQuery}
      // baseUrl={baseUrl}
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

// ----------------------------------------------------------------------------------
// import React, { useEffect } from 'react'
// import DOMPurify from 'dompurify'
// import parse from 'html-react-parser'

// // Improved highlighting function
// export const highlightText = (text, searchQuery) => {
//   if (!searchQuery || typeof text !== 'string') return text

//   // Escape special characters in the search query
//   const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

//   // Create a regex that can match the search term
//   const regex = new RegExp(`(${escapedQuery})`, 'gi')

//   // Split HTML into parts inside tags and text content
//   const parts = []
//   let inTag = false
//   let currentPart = ''

//   for (let i = 0; i < text.length; i++) {
//     if (text[i] === '<') {
//       if (currentPart) {
//         parts.push({ isTag: inTag, content: currentPart })
//         currentPart = ''
//       }
//       inTag = true
//       currentPart += text[i]
//     } else if (text[i] === '>') {
//       currentPart += text[i]
//       parts.push({ isTag: inTag, content: currentPart })
//       currentPart = ''
//       inTag = false
//     } else {
//       currentPart += text[i]
//     }
//   }

//   if (currentPart) {
//     parts.push({ isTag: inTag, content: currentPart })
//   }

//   // Only highlight text parts, not tag parts
//   return parts
//     .map((part) => {
//       if (part.isTag) return part.content
//       return part.content.replace(regex, '<mark>$1</mark>')
//     })
//     .join('')
// }

// // Helper function to parse child nodes, especially handling <mark> tags
// const parseChildNode = (child, index) => {
//   if (child?.name === 'mark') {
//     return (
//       <mark key={index}>
//         {child?.children?.map((subChild) => subChild?.data).join('')}
//       </mark>
//     )
//   }
//   return child?.data || ''
// }

// // Handle links that should open in a new tab (bookmarkSection and gtlnotes)
// const handleNewTabLink = (domNode, sectionBaseUrl) => {
//   const linkHash = domNode.attribs.href // e.g., #bookmarkSection2.1 or #gtlnotes1

//   return (
//     <a
//       href={linkHash}
//       className={domNode.attribs.class}
//       id={domNode.attribs.id}
//       onClick={(e) => {
//         e.preventDefault()

//         // Always open in a new tab with the appropriate URL and hash
//         let fullUrl

//         if (sectionBaseUrl) {
//           // If we have a base URL, use it
//           fullUrl = `${sectionBaseUrl}${linkHash}`
//         } else {
//           // Otherwise use the current page URL
//           fullUrl = `${window.location.pathname}${linkHash}`
//         }

//         console.log(`Opening link in new tab: ${fullUrl}`)
//         window.open(fullUrl, '_blank')
//       }}
//     >
//       {domNode.children?.map((child, i) => parseChildNode(child, i))}
//     </a>
//   )
// }

// // Handle links that should scroll in the same tab (#bookmark, #bookmarkback)
// const handleSameTabLink = (domNode) => {
//   const linkHash = domNode.attribs.href // e.g., #bookmark1

//   return (
//     <a
//       href={linkHash}
//       className={domNode.attribs.class}
//       id={domNode.attribs.id}
//       onClick={(e) => {
//         e.preventDefault()

//         // Scroll to the target in the same tab
//         const targetId = linkHash.substring(1) // Remove #
//         const targetElement = document.getElementById(targetId)

//         if (targetElement) {
//           targetElement.scrollIntoView({ behavior: 'smooth' })
//           console.log(`Scrolled to: ${targetId}`)
//         } else {
//           console.warn(`Target not found: ${targetId}`)
//         }
//       }}
//     >
//       {domNode.children?.map((child, i) => parseChildNode(child, i))}
//     </a>
//   )
// }

// /**
//  * React component to render HTML content with proper link handling
//  */
// const HtmlContent = ({ content, searchQuery, baseUrl }) => {
//   // Apply highlighting to the content if searchQuery is provided
//   const highlightedContent = searchQuery
//     ? highlightText(content, searchQuery)
//     : content

//   // Get base URL for section links - try from param first, then from localStorage, then current path
//   let sectionBaseUrl = baseUrl

//   if (
//     !sectionBaseUrl &&
//     typeof window !== 'undefined' &&
//     typeof localStorage !== 'undefined'
//   ) {
//     try {
//       sectionBaseUrl = localStorage.getItem('localURL')
//     } catch (e) {
//       console.error('Error accessing localStorage:', e)
//     }
//   }

//   if (!sectionBaseUrl && typeof window !== 'undefined') {
//     sectionBaseUrl = window.location.pathname
//   }

//   // Handle hash fragment scrolling when the page loads
//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.location.hash) {
//       // Small delay to ensure DOM is fully rendered
//       const timer = setTimeout(() => {
//         const hash = window.location.hash
//         // Handle any type of bookmark hash
//         if (hash.startsWith('#bookmark') || hash.startsWith('#gtlnotes')) {
//           const targetId = hash.substring(1) // Remove the # character
//           const targetElement = document.getElementById(targetId)

//           if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' })
//             console.log(`Scrolled to element: ${targetId}`)
//           } else {
//             console.warn(`Target element not found: ${targetId}`)
//           }
//         }
//       }, 300) // 300ms delay for DOM to be ready

//       return () => clearTimeout(timer)
//     }
//   }, [])

//   // Allow target, rel, class, id, name, and href attributes during sanitization
//   const cleanHtml = DOMPurify.sanitize(highlightedContent, {
//     ADD_ATTR: ['target', 'rel', 'class', 'id', 'name', 'href'],
//     ADD_TAGS: ['mark'], // Explicitly allow mark tags
//   })

//   // Parse the sanitized HTML
//   const parsedContent = parse(cleanHtml, {
//     replace: (domNode) => {
//       if (!domNode || !domNode.name) return

//       // Convert <a name="bookmarkX"> to use id attribute instead
//       if (
//         domNode.name === 'a' &&
//         domNode.attribs?.name &&
//         !domNode.attribs.id
//       ) {
//         return (
//           <a id={domNode.attribs.name}>
//             {domNode.children?.map((child, i) => parseChildNode(child, i))}
//           </a>
//         )
//       }

//       // Handle links that should open in new tab: bookmarkSection and gtlnotes
//       if (
//         domNode.name === 'a' &&
//         domNode.attribs?.href &&
//         (domNode.attribs.href.includes('bookmarkSection') ||
//           domNode.attribs.href.includes('gtlnotes'))
//       ) {
//         return handleNewTabLink(domNode, sectionBaseUrl)
//       }

//       // Handle regular bookmark links - these should open in same tab
//       if (
//         domNode.name === 'a' &&
//         domNode.attribs?.href?.startsWith('#bookmark') &&
//         !domNode.attribs.href.includes('Section')
//       ) {
//         return handleSameTabLink(domNode)
//       }

//       // Handle footnote back links - these should open in same tab too
//       if (
//         domNode.name === 'a' &&
//         domNode.attribs?.href?.startsWith('#bookmarkback')
//       ) {
//         return handleSameTabLink(domNode)
//       }

//       // Handle external links (all other links)
//       if (
//         domNode.name === 'a' &&
//         domNode.attribs?.href &&
//         !domNode.attribs.href.startsWith('#')
//       ) {
//         return (
//           <a
//             href={domNode.attribs.href}
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             {domNode.children?.map((child, i) => parseChildNode(child, i))}
//           </a>
//         )
//       }
//     },
//   })

//   return <div className='html-content'>{parsedContent}</div>
// }

// /**
//  * Main export function that returns the HtmlContent component
//  */
// export const parseHtmlSanitizeAddTargetToLinks = (
//   content,
//   searchQuery,
//   baseUrl
// ) => {
//   if (!content) return null
//   return (
//     <HtmlContent
//       content={content}
//       searchQuery={searchQuery}
//       baseUrl={baseUrl}
//     />
//   )
// }

// // Maintain existing utility exports
// export const deepCopy = (obj) => {
//   return JSON.parse(JSON.stringify(obj))
// }

// export const debounce = (func, delay) => {
//   let timeoutId
//   return (...args) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId)
//     }
//     timeoutId = setTimeout(() => {
//       func(...args)
//     }, delay)
//   }
// }