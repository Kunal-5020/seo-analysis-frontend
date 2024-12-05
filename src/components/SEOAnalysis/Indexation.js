import React, { useState, useEffect } from 'react';

const Indexation = ({ result }) => {
  const [data, setData] = useState(null); // To store resolved data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedData = await result; // Resolve the promise
        
        setData(resolvedData);
      } catch (error) {
        console.error('Error resolving data:', error);
      }
    };

    if (result) {
      fetchData();
    }
  }, [result]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const isSuccess = data.robotsContent !== 'No /robots.txt found';

  try {
    return (
      <div className="indexation">
        <h2>Indexation Report</h2>

        {/* Robots Section */}
        <h3>Robots.txt</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Present</strong></td>
              <td>{data.robotsContent === 'No /robots.txt found' ? 'NO' : 'YES'}</td>
            </tr>
            <tr>
              <td><strong>Content</strong></td>
              <td>{data.robotsContent}</td>
            </tr>
            <tr>
              <td>
                <strong>Status</strong>
              </td>
              <td><p className={`output-status ${isSuccess ? 'success' : 'failure'}`} > {isSuccess ? 'Success' : 'Failure'}</p></td>
            </tr>
          </tbody>
        </table>
        <br />
          <p className='question'>
            <strong>Why is 'Robots.txt' required?</strong>
          </p>
          <p className='answer'>Robots.txt file guides search engine crawlers, directing them to prioritize indexing important pages and avoiding indexing irrelevant or sensitive content, thus enhancing website SEO performance and visibility.</p>
          <br />

        {/* Sitemap Section */}
        <h3>Sitemap_index.xml</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Present</strong></td>
              <td>{data.sitemapConfirmation === 'No /sitemap.xml found' ? 'NO' : 'YES'}</td>
            </tr>
            <tr>
              <td>
                <strong>Status</strong>
              </td>
              <td><p className={`output-status ${isSuccess ? 'success' : 'failure'}`} > {isSuccess ? 'Success' : 'Failure'}</p></td>
            </tr>
          </tbody>
        </table>
        <p className='question'>
            <strong>Why is 'sitemap.xml' required?</strong>
          </p>
          <p className='answer'>A sitemap.xml file is crucial for website SEO as it provides search engines with a comprehensive roadmap of the site's structure and content, facilitating efficient crawling and indexing, and ultimately improving search engine visibility and rankings</p>
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

export default Indexation;
