const SearchOptimization = (data) => {
  try {
  const { canonicalLinks, alternateLinks, headSchema, bodySchema } = data.result;


  return(
    <div>
    <h2>Search Optimization Report</h2>
    <h3>Canonical Link Tag</h3>
    <table  >
      <thead>
        <tr>
          <td >S.No</td>
          <td >Link</td>
          {/* <td>Elements</td> */}
        </tr>
        </thead>
        <tbody>
        
        <tr>
          <td> 1</td>
          <td>{canonicalLinks[0].match(/href="([^"]+)"/)[1]}</td>
          {/* <td>{canonicalLinks[0]}</td> */}
        </tr>
        </tbody></table>
        <h3>Output</h3>
        <table  ><tbody>
          
          <tr>
            <td><strong>Status</strong></td>
            <td><p className={`output-status ${canonicalLinks ? 'success' : 'failure'}`} > {canonicalLinks ? 'Success' : 'Failure'}</p></td>
          </tr>
          <tr>
            <td><strong>Report</strong></td>
            <td>The inclusion of alternate links strengthens website structure and enhances user experience, optimizing SEO performance and accessibility across various platforms.</td>
          </tr>
          </tbody>
          </table>
          <p className='question'>
          <strong>Why is 'Canonical Tag' required?</strong>
        </p>
        <p className='answer'>Utilizing a canonical tag is critical for SEO as it ensures that search engines properly identify the preferred version of a webpage, avoiding duplicate content issues and maintaining the page's ranking authority.</p>
        <br/>
        
        <h3>Alternate_Links</h3>
        <table >
        <thead>
          <tr>
            <td>S.No</td>
            <td>Link</td>
            {/* <td>Element</td> */}
          </tr>
        </thead>
        <tbody>
        {alternateLinks.map((link,index) => (
          <tr>
          <td>{index + 1}</td>
          <td>{link.match(/href="([^"]+)"/)[1]}</td>
          {/* <td>{link}</td> */}
        </tr>
        ))}
        </tbody>
        </table>
        <h3>Output</h3>
        <table  >
        <tbody>
          <tr>
            <td><strong>Status</strong></td>
            <td><p className={`output-status ${alternateLinks ? 'success' : 'failure'}`} > {alternateLinks ? 'Success' : 'Failure'}</p></td>
          </tr>
          <tr>
            <td><strong>Report</strong></td>
            <td>The inclusion of alternate links strengthens website structure and enhances user experience, optimizing SEO performance and accessibility across various platforms.</td>
          </tr>
          </tbody>
          </table>
          <p className='question'>
          <strong>Why is 'Alternate Links' required?</strong>
        </p>
        <p className='answer'>Implementing alternate link tags is crucial for SEO as they help search engines understand the relationship between different languages or regional versions of a webpage, improving international targeting and organic search visibility.</p>
        <br/>
        
        <h3>Schema Markups-Structured Data </h3>
        <table  >
        <thead>
          <tr>
            <td>S.No</td>
            <td>Part</td>
            <td>Present</td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>HEAD</td>
          <td>{headSchema && headSchema.length > 0 ? "Yes": "No schema found"}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>BODY</td>
          <td>{bodySchema && bodySchema.length > 0 ? "Yes" : "No schema found"}</td>
        </tr>
        </tbody>
        </table>
        <h3>Output</h3>
        <table  >
        <tbody>
        <tr>
          <td><strong>Status</strong></td>
          <td>
          <p
          className={`output-status ${
            headSchema && headSchema.length > 0
              ? "success"
              : bodySchema && bodySchema.length > 0
              ? "warning"
              : "failure"
          }`}
        >           {headSchema && headSchema.length > 0
          ? "Success"
          : bodySchema && bodySchema.length > 0
          ? "Warning"
          : "Failure"}
          </p>
            </td>
        </tr>
        <tr>
          <td><strong>Report</strong></td>
          <td>
        {headSchema && headSchema.length > 0
          ? "Schema markup is correctly placed in the head section, which is ideal for SEO."
          : bodySchema && bodySchema.length > 0
          ? "Schema markup is found in the body section. While this is recognized by search engines, placing schema in the head section is recommended for better SEO practices."
          : "No schema markup found. Adding structured data to the head section can improve your webpage's SEO and visibility in search results."}
      </td>
      </tr>
      </tbody>
    </table>
  
    <p className='question'>
          <strong>Why is 'Schema Markups' required?</strong>
        </p>
        <p className='answer'>Using schema markup is essential for SEO as it provides search engines with structured data, enhancing the understanding of web page content and increasing the likelihood of appearing in rich snippets and other SERP features, ultimately improving visibility and click-through rates.</p>
        
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


export default SearchOptimization;

