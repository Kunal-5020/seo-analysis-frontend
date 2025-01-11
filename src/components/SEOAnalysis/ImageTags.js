import React from 'react';

const DEFAULT_IMAGE = 'https://via.placeholder.com/100';

const ImageTags = (results) => {
  try {
    // Extract favicon and images from results
    const favicon = results.result.faviconResults[0]; // First item is the favicon
    const images = results.result.imageResults; // Remaining items are images

    const faviconStatus = favicon
      ? { status: 'Success', report: 'Your website is optimized with a favicon.' }
      : { status: 'Failure', report: 'Your website is missing a favicon.' };

    return (
      <div className="meta-tags-report">
        <h2>Favicon & Images Report</h2>

        {/* Favicon Section */}
        <div className="favicon-section">
          <h3>Favicon</h3>
          <table>
            <thead>
              <tr>
              <th><strong>Favicon Icon</strong></th>
              <th><strong>Link</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr>

              <td>
                  {favicon ? (
                    <img src={favicon.href} alt="Favicon Preview" 
                    width="50"
                    height="50"/>
                  ) : (
                    'Not Found'
                  )}
                </td>
                <td>
                  {favicon ? (
                    <a href={favicon.href} target="_blank" rel="noopener noreferrer">
                      {favicon.href}
                    </a>
                  ) : (
                    'Not Found'
                  )}
                </td>
                
              </tr>
            </tbody>
          </table>
          <br/>
          <h3>OutPut</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Status</strong></td>
              <td><p className={`output-status ${favicon ? 'success' : 'failure'}`} > {faviconStatus.status} </p></td>
            </tr>
            <tr>
            <td><strong>Report</strong></td>
            <td>{faviconStatus.report}
            </td>
            </tr>
          </tbody>
        </table>

          <br />
          <p className="question">
            <strong>Why Favicon?</strong>
          </p>
          <p className="answer">
          A favicon is crucial for webpage SEO as it enhances brand recognition and user experience, fostering trust and credibility, ultimately improving site engagement and search engine visibility.
          </p>
        </div>

        {/* Images Section */}
        <div className="images-section">
          <h3>Images</h3>
          <table >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Link</th>
                <th>Alt Attribute Present</th>
                <th>Preview</th>
                <th>Status</th>
                {/* <th>Element</th> */}
              </tr>
            </thead>
            <tbody>
              {images.length === 0 ? (
                <tr>
                  <td colSpan="5">No images found.</td>
                </tr>
              ) : (
                images.map((img, index) => {
                  const missingAttributes = [];
                  if (!img.alt) missingAttributes.push('alt');
                  if (!img.src) missingAttributes.push('src');

                  // Validate if src is a valid URL
                  const isValidSrc =
                    img.src && (img.src.startsWith('http') || img.src.startsWith('//'));
                  const validSrc = isValidSrc
                    ? img.src.startsWith('//')
                      ? `https:${img.src}`
                      : img.src
                    : DEFAULT_IMAGE;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {img.src ? (
                          <a
                            href={
                              img.src.startsWith('//')
                                ? `https:${img.src}`
                                : img.src
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {img.src.startsWith('//') ? `https:${img.src}` : img.src}
                          </a>
                        ) : (
                          'Not Found'
                        )}
                      </td>
                      <td>{missingAttributes.length > 0 ? 'No' : 'Yes'}</td>
                      <td>
                        <img
                          src={validSrc}
                          alt={img.alt || `Image ${index + 1}`}
                          width="100"
                          height="100"
                          style={{ objectFit: 'cover' }}
                        />
                      </td>
                      <td>
                        <span
                          className={`output-status ${
                            missingAttributes.length > 0 ? 'failure' : 'success'
                          }`}
                        >
                          {missingAttributes.length > 0 ? 'Failure' : 'Success'}
                        </span>
                      </td>
                      {/* <td>
                        <pre>{img.imgElement}</pre>
                      </td> */}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <br />
        <p className="question">
          <strong>Alt Attributes & Why?</strong>
        </p>
        <p className="answer">
          The alt attribute in the image tag is essential for SEO as it provides
          textual context for the images, aiding search engine understanding and accessibility,
          thereby enhancing image search rankings.
        </p>
  
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message || 'An unexpected error occurred.'}</p>
      </div>
    );
  }
};

export default ImageTags;
