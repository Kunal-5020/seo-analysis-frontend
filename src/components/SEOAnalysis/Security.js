import React from 'react';

const Security = (result) => {
  try {
    const data = result.result;

    // Function to check if "rel" attribute contains "noopener" or "noreferrer"
    const checkRelAttributes = (linkElement) => {
      const rel = linkElement.rel ? linkElement.rel.toLowerCase() : '';
      return rel.includes('noopener') || rel.includes('noreferrer') ? '✔️' : '❌';
    };

    // List of social media domains to ignore
    const socialMediaDomains = ['facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com', 'youtube.com'];

    // Function to check if the link is from a social media domain
    const isSocialMediaLink = (href) => {
      return socialMediaDomains.some((domain) => href.includes(domain));
    };

    // Function to check if the link is from the same root domain (ignoring subdomains)
    const isSameRootDomain = (href) => {
      const getRootDomain = (hostname) => {
        // Remove 'www' or any common subdomains if present
        const parts = hostname.split('.');
        if (parts[0] === 'www') {
          parts.shift();  // Remove 'www' if it exists
        }
        return parts.slice(-2).join('.');  // Get root domain (e.g., indiamart.com)
      };
    
      const currentDomain = getRootDomain(window.location.hostname); // Current root domain
      const linkDomain = getRootDomain(new URL(href).hostname); // Link's root domain
    
      return currentDomain === linkDomain; // Compare root domains
    };

    let status = 'Success';

    return (
      <div>
        <h2>Security Report</h2>
        <table style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Link</th>
              <th>REL="NOOPENER" OR "NOREFERRER"</th>
              <th>Element</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => {
                // Create a temporary div to parse the HTML element
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = row; // Insert the link HTML

                const linkElement = tempDiv.querySelector('a'); // Get the <a> element

                // Check if the link should be ignored (social media or same root domain)
                if (linkElement && (isSocialMediaLink(linkElement.href) || isSameRootDomain(linkElement.href))) {
                  return null; // Skip rendering for social media or same root domain links
                }

                if (linkElement && checkRelAttributes(linkElement) === '❌') {
                  status = 'Failed';
                }

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{linkElement ? linkElement.href : 'No Link'}</td>
                    <td>{linkElement ? checkRelAttributes(linkElement) : 'No Data'}</td>
                    <td>{linkElement ? row.replace(/<i.*?>.*?<\/i>/g, '') : 'Invalid Element'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>1</td>
                <td>No Link</td>
                <td>No data</td>
                <td>No element</td>
              </tr>
            )}
          </tbody>
        </table>
        <h3>Output</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Status</strong></td>
              <td>
                <p className={`output-status ${status === 'Success' ? 'success' : 'failure'}`}>
                  {status === 'Success' ? 'Success' : 'Failure'}
                </p>
              </td>
            </tr>
            <tr>
              <td><strong>Report</strong></td>
              <td>
                {status === 'Success'
                  ? `Excellent! You have successfully added (rel='noopener' or rel='noreferrer') to anchor tags with 'target='_blank'', ensuring optimal user security and preventing potential vulnerabilities, while fortifying against unsafe cross-origin navigation for enhanced SEO performance.`
                  : `Warning! Ensure optimal user security and prevent potential vulnerabilities by adding (rel='noopener' or rel='noreferrer') to anchor tags with 'target='_blank'', fortifying against unsafe cross-origin navigation for enhanced SEO performance.`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default Security;
