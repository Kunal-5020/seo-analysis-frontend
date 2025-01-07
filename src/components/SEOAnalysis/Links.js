import React from 'react';

const Links = (data) => {
  try {
    const linkData = data.result;

    const internalLinks = linkData.filter(link => link.linkType === 'Internal');
    const externalLinks = linkData.filter(link => link.linkType === 'External');
    const hiddenLinks = linkData.filter(link => link.isHidden);


    const generateReportForExternalLinks = () => {
      if (externalLinks.length === 0) {
        return "No external links found. External links are important for SEO as they enhance the authority of your website by linking to trusted sources.";
      } else {
        return externalLinks.length > 5
          ? "Too many external links detected. You may want to review if they are all relevant to your content."
          : "External links are balanced and contribute positively to your SEO strategy.";
      }
    };

    const generateReportForInternalLinks = () => {
      if (internalLinks.length === 0) {
        return "No internal links found. Internal links are critical for SEO to improve navigation and spread link equity across your site.";
      } else {
        return internalLinks.length > 10
          ? "Too many internal links could clutter the user experience. Consider prioritizing the most important pages."
          : "Internal links are properly used to improve user experience and site structure.";
      }
    };

    const generateReportForHiddenLinks = () => {
      if (hiddenLinks.length > 0) {
        return "Hidden links detected. These could harm your SEO performance and are generally against search engine guidelines.";
      } else {
        return "No hidden links found, which is great for transparency and SEO.";
      }
    };

    return (
      <div className='links'>
        <h2>Links Report</h2>

        {/* External Links Section */}
        <h3>External Links</h3>
        <table>
          <thead>
            <tr>
              <td>S.No</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody>
            {externalLinks.map((link, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{link.link}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>OutPut</h3>
        <table>
          <tbody>
            <tr>
              <td>Status</td>
              <td>
                <p className={`output-status ${externalLinks.length > 0 ? 'success' : 'failure'}`}>
                  {externalLinks.length > 0 ? 'Success' : 'Failure'}
                </p>
              </td>
            </tr>
            <tr>
              <td><strong>Report</strong></td>
              <td>
              {generateReportForExternalLinks()}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p className='question'>
          <strong>Why External Links?</strong>
        </p>
        <p className='answer'>
          External links are essential for SEO as they validate a website's credibility and authority by associating it with reputable sources, improving search engine rankings and trustworthiness while enhancing the site's overall visibility and domain authority in search engine results.
        </p>
        <br />

        {/* Hidden Links Section */}
        <h3>Hidden Links</h3>
        <table>
          <thead>
            <tr>
              <td>S.No</td>
              <td>Link</td>
              <td>Element</td>
            </tr>
          </thead>
          <tbody>
            {hiddenLinks.length > 0 ? 
              hiddenLinks.map((link, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{link.link}</td>
                  <td>{link.element}</td>
                </tr>
              )) :
              <tr>
                <td>1</td>
                <td>No Links Available</td>
                <td>Not Present</td>
              </tr>
            }
          </tbody>
        </table>

        <h3>OutPut</h3>
        <table>
          <tbody>
            <tr>
              <td>Status</td>
              <td>
                <p className={`output-status ${hiddenLinks.length <= 0 ? 'success' : 'failure'}`}>
                  {hiddenLinks.length <= 0 ? 'Success' : 'Failure'}
                </p>
              </td>
            </tr>
            <tr>
              <td><strong>Report</strong></td>
              <td>
              {generateReportForHiddenLinks()}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p className='question'>
          <strong>Why no Hidden Links?</strong>
        </p>
        <p className='answer'>
          Avoid using the hidden links in webpage SEO as they violate search engine guidelines, leading to penalties or de-indexing. Transparency and relevance are key; visible, contextually relevant links contribute positively to user experience and search engine rankings.
        </p>
        <br />

        {/* Internal Links Section */}
        <h3>Internal Links</h3>
        <table>
          <thead>
            <tr>
              <td>S.No</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody>
            {internalLinks.map((link, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{link.link}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>OutPut</h3>
        <table>
          <tbody>
            <tr>
              <td>Status</td>
              <td>
                <p className={`output-status ${internalLinks.length > 0 ? 'success' : 'failure'}`}>
                  {internalLinks.length > 0 ? 'Success' : 'Failure'}
                </p>
              </td>
            </tr>
            <tr>
              <td><strong>Report</strong></td>
              <td>
              {generateReportForInternalLinks()}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p className='question'>
          <strong>Why Internal Links?</strong>
        </p>
        <p className='answer'>
          Internal links are vital for SEO as they establish a logical hierarchy within a website, distributing link equity and guiding search engine crawlers to discover and index pages effectively, ultimately enhancing overall website visibility and authority in search engine results.
        </p>
        <br />
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

export default Links;
