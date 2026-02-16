import React, { useEffect, useState } from 'react'
import { parseHtmlSanitizeAddTargetToLinks } from '../utils/utils'
import guideData from './uae-guide.json'

function Test() {
  // State for fetched content
  const [htmlContent, setHtmlContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [dataSource, setDataSource] = useState('local') // Track data source

  // For testing - you can make these dynamic via props or URL params
  const lawSlug = 'uae-cit-fdl-47-of-2022'
  const uniqueCode = 'CTGAPA1'
  
  // Toggle to try API or use local data only
  // Set to true to enable API calls, false to use only local data
  const ENABLE_API_FETCH = false

  // Fetch content from API or fallback to local JSON
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (ENABLE_API_FETCH) {
          const apiUrl = `http://localhost:3000/api/v1/${lawSlug}-${uniqueCode}`
          
          try {
            const response = await fetch(apiUrl, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
            
            if (!response.ok) {
              throw new Error(`API Error: ${response.status} ${response.statusText}`)
            }
            
            // Check content-type header
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error(`Expected JSON but got ${contentType || 'unknown'} content type`)
            }
            
            const data = await response.json()
            
            // Extract content from the response
            // Handle both array response and single object response
            const content = Array.isArray(data) ? data[0]?.content : data?.content
            
            if (!content) {
              throw new Error('No content found in API response')
            }
            
            setHtmlContent(content)
            setDataSource('api')
            return
          } catch (apiError) {
            console.log('API fetch disabled or failed, using local data')
          }
        }
        
        // Load from local JSON file for testing
        const localContent = Array.isArray(guideData) ? guideData[0]?.content : guideData?.content
        
        if (!localContent) {
          throw new Error('No content found in local data')
        }
        
        setHtmlContent(localContent)
        setDataSource('local')
      } catch (err) {
        console.error('Error loading content:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [lawSlug, uniqueCode, ENABLE_API_FETCH])

  // Load external CSS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    // link.href = "https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/prod/article.css";
    // link.href = "https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/prod/decision.css";
    link.href = "https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/prod/guide.css";
    // link.href = "https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/prod/dtaa.css";
    link.id = "external-css";

    if (!document.getElementById("external-css")) {
      document.head.appendChild(link);
    }

    return () => {
      document.getElementById("external-css")?.remove();
    };
  }, []);

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className='App'>
      <header className='App-header' style={{ padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.85em', color: '#666' }}>
            Data Source: <strong>{dataSource.toUpperCase()}</strong>
            {ENABLE_API_FETCH && (
              <span style={{ marginLeft: '10px', color: '#999' }}>
                (API enabled)
              </span>
            )}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '14px'
            }}
            placeholder="Search..."
            disabled={loading}
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>Loading content...</p>
            </div>
          )}
          
          {error && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#d32f2f',
              backgroundColor: '#ffebee',
              borderRadius: '4px',
              border: '1px solid #ef5350'
            }}>
              <h3>Error Loading Content</h3>
              <p>{error}</p>
              <p style={{ fontSize: '0.9em', marginTop: '10px', color: '#666' }}>
                Attempted API URL: http://localhost:3000/api/v1/{lawSlug}-{uniqueCode}
              </p>
              <p style={{ fontSize: '0.85em', marginTop: '8px', color: '#999' }}>
                To enable API calls, set ENABLE_API_FETCH to true in Test.js
              </p>
            </div>
          )}
          
          {!loading && !error && htmlContent && (
            parseHtmlSanitizeAddTargetToLinks(htmlContent, searchTerm)
          )}
        </div>
      </header>
    </div>
  )
}

export default Test;
