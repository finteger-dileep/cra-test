import React, { useEffect, useState } from 'react'
import { parseHtmlSanitizeAddTargetToLinks } from '../utils/utils-latest-production'
import html from './content.html';

function Test() {

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/prod/guide.css";
    // link.href = "https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/prod/dtaa.css";
    // link.href = "https://gtlcdn-eufeh8ffbvbvacgf.z03.azurefd.net/guide/stylesheets/prod/decision.css";
    link.id = "external-css";

    if (!document.getElementById("external-css")) {
      document.head.appendChild(link);
    }

    return () => {
      document.getElementById("external-css")?.remove(); // Cleanup on unmount
    };

  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  // const [foundContent, setFoundContent] = useState('')


  function handleSearchChange(e) {
      setSearchTerm(e.target.value);
  }

  return (
    <div className='App'>
      <header className='App-header' style={{ padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}>
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
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          {parseHtmlSanitizeAddTargetToLinks(html, searchTerm)}
        </div>
      </header>
    </div>
  )
}

export default Test;
