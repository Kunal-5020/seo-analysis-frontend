const SocialNetworks = (result) => {
  try{
  const linkdata = result.result;

  return(
    <div>
      <h2>Socail Media Links Report</h2>
    <h3>Social Media Links</h3>
        <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Link</th>
                    <th>Platform</th>
                    
                </tr>
            </thead>
            <tbody>
            {linkdata.length > 0?linkdata.map((linkdata,index)=>(
              <tr key={index}>
                <td>{linkdata.sNo}</td>
                <td>{linkdata.link}</td>
                <td>{linkdata.platform }</td>
                
              </tr>
            )) : <tr><td colSpan="4">No Data Found</td></tr>}
            </tbody>
            </table>
            <h3>Output</h3>
            <table>
              <tbody>
                <tr>
                  <td><strong>Status</strong></td>
                  <td><p className={`output-status ${linkdata.length > 0 ? 'success' : 'failure'}`} > {linkdata.length > 0 ? 'Success' : 'Failure'}</p></td>
                </tr>
                <tr>
                  <td><strong>Report</strong></td>
                  <td>{linkdata.length > 0?'Social media links present on this webpage, optimizing online visibility and fostering user engagement for enhanced SEO benefits.':'Social media links absent from this webpage, limiting online visibility and reducing user engagement, which may negatively impact SEO benefits.'}</td>
                </tr>
              </tbody>
            </table>
            <br />
          <p className='question'>
            <strong>Why are 'Social Media Links' required?</strong>
          </p>
          <p className='answer'>Including social media links in a webpage is crucial for SEOas it fosters social engagement and shares ,expanding the website's reach and potentially increasing traffic and visibility .</p>
          <br />
            </div>
  )
} catch (error) {
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  );
}
};

export default SocialNetworks;
