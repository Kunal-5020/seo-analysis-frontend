import React from 'react';


const Domains = (result) => {
  try {
    if (!result || !result.result) {
      throw new Error("No result data provided.");
    }

    const data = result.result;

    return (
      <div className="domain-report-container">
        <h2 className="domain-report-title">Domain Report</h2>
        <table className="domain-report-table">
          <tbody>
            <tr>
              <td><strong>Domain</strong></td>
              <td>{data.domain || 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>Domain Length</strong></td>
              <td>{data.domainLength || 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>Special Characters</strong></td>
              <td>{data.specialCharacters || 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>Subdomains</strong></td>
              <td>{data.subdomains || 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>
                <p
                  className={`output-status ${
                    data.status === 'Success' ? 'success' : 'failure'
                  }`}
                >
                  {data.status === 'Success' ? 'Success' : 'Failure'}
                </p>
              </td>
            </tr>
            <tr>
              <td><strong>Message</strong></td>
              <td>{data.message || 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>SEO Report</strong></td>
              <td>{data.report || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return (
      <div className="error-container">
        <h2 className="error-title">Error in the Code</h2>
        <p className="error-message">{error.message}</p>
      </div>
    );
  }
};

export default Domains;
