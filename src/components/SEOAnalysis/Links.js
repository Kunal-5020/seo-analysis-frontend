import React from 'react';


const Links = ( data ) => {
  try {
  const linkData = data.result;

  const internalLinks = linkData.filter(link => link.linkType === 'Internal');
  const externalLinks = linkData.filter(link => link.linkType === 'External');
  const hiddenLinks = linkData.filter(link => link.isHidden);

  return (
    <div className='links'>
      <h2>Links Report</h2>
      <h3>External Links</h3>
      <table>
        <thead>
          <tr>
            <td>S.No</td>
            <td>Link</td>
          </tr>
        </thead>
        <tbody>
          {externalLinks.map((link,index)=> (
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
              <td><p className={`output-status ${externalLinks.length > 0 ? 'success' : 'failure'}`} > {externalLinks.length > 0 ? 'Success' : 'Failure'}</p></td>
            </tr>
            <tr>
            <td><strong>Report</strong></td>
            <td>External links augment your webpage's authority and relevance, bolstering SEO performance by providing valuable context and credibility.
            </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <p className='question'>
          <strong>Why External Links?</strong>
        </p>
        <p className='answer'>External links are essential for SEO as they validate a website's credibility and authority by associating it with reputable sources, improving search engine rankings and trustworthiness while enhancing the site's overall visibility and domain authority in search engine results.</p>
        <br/>

      <h3>Hidden Links</h3>
      <table>
        <thead>
          <tr>
            <td>S.No</td>
            <td>Link</td>
            <td>Element</td>

          </tr>
        </thead>
        <tbody>{hiddenLinks.length > 0 ?
        hiddenLinks.map((link,index)=> (
            <tr key={index}>
              <td>{index+1}</td>
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
              <td><p className={`output-status ${hiddenLinks.length <= 0 ? 'success' : 'failure'}`} > {hiddenLinks.length <= 0  ? 'Success' : 'Failure'}</p></td>
            </tr>
            <tr>
            <td><strong>Report</strong></td>
            <td>Your webpage's transparency in avoiding hidden links ensures credibility and trustworthiness, enhancing user experience and search engine perception.
            </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <p className='question'>
          <strong>Why no Hidden Links?</strong>
        </p>
        <p className='answer'>Avoid using the hidden links in webpage SEO as they violate search engine guidelines, leading to penalties or de-indexing. Transparency and relevance are key; visible, contextually relevant links contribute positively to user experience and search engine rankings.</p>
        <br/>

      <h3>Internal Links</h3>
      <table>
        <thead>
          <tr>
            <td>S.No</td>
            <td>Link</td>
          </tr>
        </thead>
        <tbody>
        {internalLinks.map((link,index)=> (
            <tr key={index}>
              <td>{index+1}</td>
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
              <td><p className={`output-status ${internalLinks.length > 0 ? 'success' : 'failure'}`} > {internalLinks.length > 0 ? 'Success' : 'Failure'}</p></td>
            </tr>
            <tr>
            <td><strong>Report</strong></td>
            <td>Internal links optimize webpage structure and user experience, elevating SEO performance for enhanced navigation and visibility.
            </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <p className='question'>
          <strong>Why Internal Links?</strong>
        </p>
        <p className='answer'>Internal links are vital for SEO as they establish a logical hierarchy within a website, distributing link equity and guiding search engine crawlers to discover and index pages effectively, ultimately enhancing overall website visibility and authority in search engine results.</p>
        <br/>
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
