import React, { useState } from 'react';
import Part from './part.js';
import '../styles/SEOAnalysis.css';
import { generatePDF } from '../utils/DownloadPDF.js';
import PopupForm from '../utils/email.jsx';

import { 
  checkMetaTags, 
  checkIndexation,  
  checkSearchOptimization, 
  checkSocialNetworks, 
  checkCustom404, 
  checkDomains, 
  checkHeadingTags, 
  checkSecurity 
} from '../utils/seoCheck';

const SEOAnalysis = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [robots, setRobots] = useState('');
  const [sitemap, setSitemap] = useState('');
  const [page404, setPage404] = useState('');
  const [selectedPart, setSelectedPart] = useState(null);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [allResults, setAllResults] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

  const handleAnalyze = async () => {
    if (!url) {
      alert('Please enter a valid URL!');
      return;
    }

    setIsAnalyzing(true);

    try {
      const proxyUrl = `https://seo-analystics.onrender.com/proxy-fetch?url=${encodeURIComponent(url)}`;
      // const proxyUrl = `http://localhost:5000/proxy-fetch?url=${encodeURIComponent(url)}`;
      
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch source code: ${response.statusText}`);
      }

      const data = await response.json();
      setSourceCode(data.sourceCode);
      setRobots(data.robots);
      setSitemap(data.sitemap);
      setPage404(data.page404);

      setIsAnalyzed(true);
      setSelectedPart(null);

      const results = {};
      parts.forEach((part) => {
        results[part.name] = part.util(data.sourceCode, url, robots, sitemap, page404);
      });
      setAllResults(results);

    } catch (error) {
      console.error(error);
      alert('Failed to fetch source code. Please check the URL and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const parts = [
    { name: 'Meta Tags', util: checkMetaTags },
    { name: 'Indexation', util: checkIndexation },
    { name: 'Search Optimization', util: checkSearchOptimization },
    { name: 'Social Networks', util: checkSocialNetworks },
    { name: 'Custom 404 Page', util: checkCustom404 },
    { name: 'Domains', util: checkDomains },
    { name: 'Heading Tags', util: checkHeadingTags },
    { name: 'Security', util: checkSecurity },
  ];

  const handleDownloadReportPDF = () => {
    if (!isFormSubmitted) {
      alert('Please submit the form before downloading the report!');
      return;
    }

    const reportField = document.querySelector('.report-field');
    if (!reportField) {
      alert('No report available to download!');
      return;
    }

    generatePDF('report-field', url);
  };

  const handleAllParts = () => {
    setSelectedPart(null);
  };

  const handleFormSubmission = () => {
    setIsFormSubmitted(true); 
    localStorage.setItem('formSubmitted', 'true');
    setIsPopupVisible(false); // Close the popup form
    handleDownloadReportPDF();
  };

  const checkIfFormSubmitted = () => {
    return localStorage.getItem('formSubmitted') === 'true';
  };

  const isOldUser = checkIfFormSubmitted();

  const handleDownload=()=>{
    if(!isOldUser){
      setIsPopupVisible(true)
    }
    else{
      setIsFormSubmitted(true)
      handleDownloadReportPDF();
    }
  }


  return (
    <div className="seo-analysis">
      <div className="seo-intro">
        <h1>SEO Analysis Tool</h1>
        <p>Enter a URL to analyze its SEO performance. This tool checks various aspects of your webpage, such as Meta Tags, Security, and more. Click "Analyze" to start the process and explore detailed results for each part.</p>
      </div>

      <div className="url-input">
        <input
          type="text"
          placeholder="Enter URL to analyze..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="analyze-button" onClick={handleAnalyze} disabled={isAnalyzing}>
          Analyze
        </button>
      </div>

      {isAnalyzing && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading, please wait...</p>
        </div>
      )}

{isAnalyzed && (
  <div className="analysis-parts">
    <h3>Select a Part to Analyze:</h3>
    <p>Choose from the following sections to see detailed analysis of each SEO aspect:</p>
    {parts.map((part, index) => (
      <button
        className={`part-button ${selectedPart === part ? "active" : ""}`}
        key={index}
        onClick={() => setSelectedPart(part)}
      >
        {part.name}
      </button>
    ))}
    <button
      className={`part-button ${selectedPart === "All" ? "active" : ""}`}
      onClick={() => {
        setSelectedPart("All");
        handleAllParts();
      }}
    >
      All
    </button>
  </div>
)}


      {selectedPart === null && isAnalyzed && (
        <div>
        <button className="part-button download-pdf-button" onClick={handleDownload}>
          Download Report as PDF
        </button>
        <div className="report-field">
          {parts.map((part) => (
            <div key={part.name}>
              <Part partName={part.name} result={allResults[part.name]} />
            </div>
          ))}
        </div>
        </div>
      )}

      {selectedPart && (
        <div>
          <button className="part-button download-pdf-button" onClick={handleDownload}>
            Download Report as PDF
          </button>
          <div className="report-field">
            <Part
              partName={selectedPart.name}
              result={selectedPart.util(sourceCode, url, robots, sitemap, page404)}
            />
          </div>
        </div>
      )}

      {/* Popup Form */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <PopupForm onSubmit={handleFormSubmission} setIsPopupVisible={setIsPopupVisible} />
        </div>
      )}
    </div>
  );
};

export default SEOAnalysis;
