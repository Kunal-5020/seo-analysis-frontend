import React from 'react';

const Custom404 = (  result  ) => {
  const data = result.result;  // Accessing the result object

  return (
    <div>
      <h2>Custom 404 Page Report</h2>
      <table>
        <h3>Is Custom 404 page used</h3>
        <tbody>
          <tr>
            <td>
              <strong>Is Custom</strong>
            </td>
            <td>{data.custom404}</td>
          </tr>
        </tbody>
      </table>

      <h3>Output</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>Status</strong></td>
            <td>
              <p
                className={`output-status ${
                  data.custom404 === 'YES' ? 'success' : 'failure'
                }`}
              >
                {data.custom404 === 'YES' ? 'Success' : 'Failure'}
              </p>
            </td>
          </tr>
          {/* Displaying additional conditions */}
          <tr>
            <td><strong>404 in Source Code</strong></td>
            <td>{data.additionalConditions.is404InSourceCode ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td><strong>Is Page Blocked by Robots</strong></td>
            <td>{data.additionalConditions.isRobotsBlocked ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td><strong>Is Page Listed in Sitemap</strong></td>
            <td>{data.additionalConditions.isInSitemap ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
      <br />
          <p className='question'>
            <strong>Why is 'Custom 404 Page' required?</strong>
          </p>
          <p className='answer'>A custom 404 page is essential for SEOas it enhances user experience by guiding visitors to relevant contentwhen they encounter broken links or unavailable pages , minimizing bounce rates and preserving search engine crawlability and indexing.</p>
    </div>
  );
};

export default Custom404;
