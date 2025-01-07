import React from 'react';

const MetaTags = ({ result }) => { 
  try {
    const renderMetaTagReport = (tagName, content, length, element, min, max, description, whyRequired) => {
      const isTagMissing = content === 'Not Available';
      const isLengthValid = length >= min && length <= max;
      const isWarning = !isTagMissing && !isLengthValid; 
      const isSuccess = !isTagMissing && isLengthValid;

      let status;
      let statusClass;
      let statusMessage;

      // Determine status and create appropriate message and class
      if (isTagMissing) {
        status = 'Failed';
        statusClass = 'failure';
        statusMessage = `The '${tagName}' tag is missing. This tag is required for optimal SEO and visibility.`;
      } else if (isWarning) {
        status = 'Warning';
        statusClass = 'warning';
        statusMessage = `The '${tagName}' tag is present, but its length is not within the recommended range. Please adjust it to improve SEO.`;
      } else if (isSuccess) {
        status = 'Success';
        statusClass = 'success';
        statusMessage = `The '${tagName}' tag is present and meets the recommended length. This is optimal for SEO.`;
      }

      return (
        <div className="meta-tag-section">
          <h3>{tagName}</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Content</strong></td>
                <td>{content}</td>
              </tr>
              <tr>
                <td><strong>Length</strong></td>
                <td>{length}</td>
              </tr>
              <tr>
                <td><strong>Element</strong></td>
                <td>
                  <code>{element}</code>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Output Section */}
          <h3>OutPut</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Status</strong></td>
                <td><p className={`output-status ${statusClass}`}>{status}</p></td>
              </tr>
              <tr>
                <td><strong>Recommended Length:</strong></td>
                <td>Min: {min} Characters & Max: {max} Characters</td>
              </tr>
              <tr>
                <td><strong>Report</strong></td>
                <td>{statusMessage}</td>
              </tr>
            </tbody>
          </table>


          <br />
          <p className='question'>
            <strong>Why is '{tagName}' required?</strong>
          </p>
          <p className='answer'>{whyRequired}</p>
          <br />
        </div>
      );
    };

    return (
      <div className="meta-tags-report">
        <h2>Meta Tags Report</h2>

        {renderMetaTagReport(
          'Meta Title Tags',
          result?.title?.content || 'Not Available', 
          result?.title?.length || 0, 
          `<title>${result?.title?.content || 'Not Available'}</title>`,
          30,
          70,
          'The meta title on this webpage meets the recommended 30-70 character length range, ensuring optimal search engine optimization efforts, increased visibility, and higher click-through rates.',
          'Meta title tags are critical for SEO as they provide a concise, relevant summary of a web page\'s content, influencing search engine rankings and click-through rates in search results, thereby enhancing website visibility and organic traffic.'
        )}

        {renderMetaTagReport(
          'Meta Description Tags',
          result?.description?.content || 'Not Available', 
          result?.description?.length || 0, 
          `<meta name="description" content="${result?.description?.content || 'Not Available'}">`,
          150,
          200,
          'The meta description tag on this webpage meets the recommended length of 150-200 characters, optimizing the snippet displayed in search results for improved click-through rates and user engagement, thus positively impacting search engine optimization efforts.',
          'Meta description tags are vital for SEO as they provide a brief, compelling summary of a web page\'s content, influencing search engine users\' decision to click on the link, thereby improving click-through rates and overall website visibility in search results.'
        )}

        {renderMetaTagReport(
          'Meta Charset Tag',
          result?.charset?.content || 'Not Available', 
          result?.charset?.content?.length || 0, 
          `<meta charset="${result?.charset?.content || 'Not Available'}">`,
          1,
          10, 
          'The meta charset tag on this webpage is crucial for SEO, ensuring accurate encoding and character set declaration, thereby enhancing website rendering, compatibility, and user experience for improved search engine performance.',
          'The meta charset tag is essential for SEO as it specifies the character encoding, ensuring accurate text and special character display, critical for optimal user experience and search engine indexing.'
        )}

        {renderMetaTagReport(
          'Meta Robots Tag',
          result?.robots?.content || 'Not Available', 
          result?.robots?.content?.length || 0, 
          `<meta name="robots" content="${result?.robots?.content || 'Not Available'}">`,
          1,
          100, 
          'The meta robots tag on this webpage dictates search engine behavior, guiding indexing and crawling directives, influencing content visibility and indexing, which are crucial for SEO strategy and website performance.',
          'The meta robots tag plays a crucial role in SEO by dictating how search engines crawl and index a web page, directly influencing its visibility and rankings in search results. It\'s imperative to set the directives to “all“ or “index, follow“ to ensure optimal indexing and crawling for maximum visibility.'
        )}

        {renderMetaTagReport(
          'Meta Viewport Tag',
          result?.viewport?.content || 'Not Available', 
          result?.viewport?.content?.length || 0, 
          `<meta name="viewport" content="${result?.viewport?.content || 'Not Available'}">`,
          1,
          100, 
          'The meta viewport tag on this webpage ensures proper display and responsiveness across devices. Its inclusion optimizes user experience and enhances mobile-friendliness, crucial for SEO and website performance.',
          'The meta viewport tag is crucial for SEO as it ensures proper rendering and usability of web pages across various devices, enhancing user experience and potentially improving search engine rankings.'
        )}
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

export default MetaTags;
