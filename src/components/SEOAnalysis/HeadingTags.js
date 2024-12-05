import React from 'react';

const HeadingTags = ( result ) => {
  try {
    const { h1, h2, h3, h4, h5, h6 } = result.result;

    const renderTable = (heading, headingData) => {
      if (headingData === 'Not Found' || headingData.length === 0) {
        return (<div>
          <h3>{heading} Tags</h3>
          <table>
            <thead>
            <tr>
                <th>S.No</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>Not Found</td>
              </tr>
            </tbody>
          </table>
        </div>);
      }

      return (
        <div>
          <h3>{heading} Tags</h3>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {headingData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div className="part">
        <h2>Heading Tags Report</h2>

        {/* Render each heading table */}
        {renderTable('H1', h1)}
        {renderTable('H2', h2)}
        {renderTable('H3', h3)}
        {renderTable('H4', h4)}
        {renderTable('H5', h5)}
        {renderTable('H6', h6)}
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

export default HeadingTags;
