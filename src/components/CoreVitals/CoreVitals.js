import React, { useState } from 'react';
import '../styles/CoreVitals.css';
import { generatePDF } from '../utils/DownloadPDF.js';
import PopupForm from '../utils/email.jsx';

const PageSpeedInsights = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [view, setView] = useState('mobile'); // Default view is 'mobile'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [experienceView, setExperienceView] = useState('loadingExperience'); // Default is 'loadingExperience'
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loadTimes, setLoadTimes] = useState([]); // Track loading times
  const [averageLoadTime, setAverageLoadTime] = useState(null); // Store average load time

  
  const checkIfFormSubmitted = () => {
    return localStorage.getItem('formSubmitted') === 'true';
  };
  
  
  const isOldUser = checkIfFormSubmitted();

  const fetchPageSpeedData = async () => {
    if(!isOldUser){
      setIsPopupVisible(true)
    }
    else{
    setLoading(true);
    setError(null);
    setData(null);
    const startTime = Date.now();
    try {
      const response = await fetch(
        `https://seo-analystics.onrender.com/pagespeed?url=${encodeURIComponent(url)}`
        // `http://localhost:5000/pagespeed?url=${encodeURIComponent(url)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      const endTime = Date.now(); // Record end time
      const loadTime = endTime - startTime; // Calculate load time
      setLoadTimes(prev => [...prev, loadTime]); // Store individual load time
      setAverageLoadTime(loadTimes.reduce((acc, time) => acc + time, 0) / loadTimes.length); // Calculate average
      setLoading(false);
    }
  }
  };

  const handleDownloadReportPDF = () => {

    const reportField = document.querySelector('.both-view');
    if (!reportField) {
      alert('No report available to download!');
      return;
    }
    generatePDF('both-view', url);
  };

  const handleFormSubmission = () => {
    setIsPopupVisible(false); // Close the popup form
  };


  const handleDownload=()=>{
      handleDownloadReportPDF();
  }


  const checkCoreVitals = (experienceData) => {
    if (!experienceData?.metrics) return 'N/A';

    const lcpCategory = experienceData.metrics.LARGEST_CONTENTFUL_PAINT_MS?.category || 'N/A';
    const inpCategory = experienceData.metrics.INTERACTION_TO_NEXT_PAINT?.category || 'N/A';
    const clsCategory = experienceData.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category || 'N/A';

    const isLCPPass = lcpCategory === 'FAST';
    const isINPPass = inpCategory === 'FAST';
    const isCLSPass = clsCategory === 'FAST';

    return isLCPPass && isINPPass && isCLSPass ? 'Pass' : 'Fail';
  };

  const CircularScore = ({ score, title }) => {
    let color;
  let glowColor;

  // Determine the color based on the score
  if (score <= 50) {
    color = '#FF4D4F'; // Red for low scores
    glowColor = '#FF4D4F'; // Red glow
  } else if (score <= 90) {
    color = '#FFC107'; // Yellow for medium scores
    glowColor = '#FFC107'; // Yellow glow
  } else {
    color = '#4CAF50'; // Green for high scores
    glowColor = '#4CAF50'; // Green glow
  }
  
    return (
      <div className="circle-wrapper">
        <div className="circle" style={{ backgroundColor: color }}>
          {score}
        </div>
        <div className="title" style={{ textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}` }}>{title}</div>
      </div>
    );
  };
  
  
  
  const renderDiagnose = (lighthouseResult) => {
    const categories = lighthouseResult.categories;
  
    const scores = [
      {
        title: "Performance",
        score: Math.round(categories.performance.score * 100) || 0,
        // details: lighthouseResult.audits['performance-audit']?.description || "No issues found.",
      },
      {
        title: "Accessibility",
        score: Math.round(categories.accessibility.score * 100) || 0,
        // details: lighthouseResult.audits['accessibility-audit']?.description || "No issues found.",
      },
      {
        title: "Best Practices",
        score: Math.round(categories['best-practices'].score * 100) || 0,
        // details: lighthouseResult.audits['best-practices-audit']?.description || "No issues found.",
      },
      {
        title: "SEO",
        score: Math.round(categories.seo.score * 100) || 0,
        // details: lighthouseResult.audits['seo-audit']?.description || "No issues found.",
      },
    ];
  
    return (
      <div className="diagnose">
        <h2>Diagnose</h2>
        <div className="circle-container">
          {scores.map((item, index) => (
            <CircularScore
              key={index}
              title={item.title}
              score={item.score}
              details={item.details}
            />
          ))}
        </div>
      </div>
    );
  };
  

  const renderMetrics = (experienceData) => {
    if (!experienceData?.metrics) return <p>No data available.</p>;

    const { metrics } = experienceData;

    const metricData = [
      {
        name: 'Largest Contentful Paint (LCP)',
        value: metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile / 1000 || 0,
        unit: 'sec',
        ranges: { good: [0, 2.5], average: [2.5, 4], poor: [4, Infinity] },
      },
      {
        name: 'Interaction to Next Paint (INP)',
        value: metrics.INTERACTION_TO_NEXT_PAINT?.percentile || 0,
        unit: 'ms',
        ranges: { good: [0, 200], average: [200, 500], poor: [500, Infinity] },
      },
      {
        name: 'First Contentful Paint (FCP)',
        value: metrics.FIRST_CONTENTFUL_PAINT_MS?.percentile / 1000 || 0,
        unit: 'sec',
        ranges: { good: [0, 1.8], average: [1.8, 3], poor: [3, Infinity] },
      },
      {
        name: 'Experimental Time to First Byte (TTFB)',
        value: metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile / 1000 || 0,
        unit: 'sec',
        ranges: { good: [0, 1], average: [1, 1.5], poor: [1.5, Infinity] },
      },
      {
        name: 'Cumulative Layout Shift (CLS)',
        value: metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile/100 || 0,
        unit: '',
        ranges: { good: [0, 0.1], average: [0.1, 0.25], poor: [0.25, Infinity] },
      },
    ];

    function getRangeColor(value, ranges) {
      // Check if the value is within the good range
      if (value >= ranges.good[0] && value <= ranges.good[1]) {
        return "good";  // Green for good
      } 
      // Check if the value is within the average range
      else if (value >= ranges.average[0] && value <= ranges.average[1]) {
        return "average";  // Yellow for average
      } 
      // If the value falls outside the good or average range, it's poor
      else {
        return "poor";  // Red for poor
      }
    }
    
  

    return (
<>
  <div className={`core-assessment ${checkCoreVitals(experienceData)}`}>
    Core Web Vitals Assessment: {checkCoreVitals(experienceData)}
  </div>
  <div className="metrics-cards">
    {metricData.map((metric, index) => (
      <div className="card" key={index}>
        <h4>{metric.name}</h4>
        <div className="bar-wrapper">
          <progress
            value={metric.value}
            max={metric.ranges.good[1]}
            className={`${getRangeColor(metric.value, metric.ranges)}`}
          ></progress>
          <span className="value">
            {metric.value} {metric.unit}
          </span>
        </div>
        <div className="range-info">
          <p>
            <span className="red-dot"></span> Poor: {metric.ranges.poor.join(' - ')} {metric.unit}
          </p>
          <p>
            <span className="yellow-dot"></span> Average: {metric.ranges.average.join(' - ')}{' '}
            {metric.unit}
          </p>
          <p>
            <span className="green-dot"></span> Good: {metric.ranges.good.join(' - ')}{' '}
            {metric.unit}
          </p>
        </div>
      </div>
    ))}
  </div>
</>


    );
  };

  const renderData = (view) => {
    if (!data?.[view]) return <p>No data available for {view} view.</p>;

    return (
      <div className="experience-section">
        <h4>{experienceView === 'loadingExperience' ? 'This Url' : 'Origin'}</h4>
        {renderMetrics(data[view][experienceView])}
        {renderDiagnose(data[view]['lighthouseResult'])}
      </div>
    );
  };

  const renderBothData = () => {
    if (!data) return <p>No data available.</p>;

    return (
      <><br />
      <button className="part-button download-pdf-button" onClick={handleDownload}>
            Download Report as PDF
          </button>
          <br />
      <div className="both-view">
        <div className="view-section">
          <h2>Mobile</h2>
          <h3>This Url</h3>
          {renderMetrics(data['mobile']?.loadingExperience)}
          <br/>
          <h3>Origin</h3>
          {renderMetrics(data['mobile']?.originLoadingExperience)}
          <h3>Diagnose performance issues</h3>
          {renderDiagnose(data['mobile']['lighthouseResult'])}
        </div>
        <div className="view-section">
          <h2>Desktop</h2>
          <h3>This Url</h3>
          {renderMetrics(data['desktop']?.loadingExperience)}
          <br/>
          <h3>Origin</h3>
          {renderMetrics(data['desktop']?.originLoadingExperience)}
          <h3>Diagnose performance issues</h3>
          {renderDiagnose(data['desktop']['lighthouseResult'])}
        </div>
      </div>
      </>
    );
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
  };

const renderLoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="circle-loader">
        <div className="circle-inner"></div>
      </div>
      <p>Loading... <span className="loading-time">({averageLoadTime ? averageLoadTime.toFixed(0)/1000 + ' s' : 'N/A'})</span></p>
    </div>
  );
};


  return (
    <>
    <div className="details-section">
            <h3>Why Core Vitals are Important</h3>
            <p>
              Core Web Vitals are essential for measuring the user experience on your website. They focus on key aspects like loading performance, interactivity, and visual stability. By optimizing these factors, you can ensure a smooth and efficient experience for users, which directly impacts your website's engagement, retention, and SEO performance.
            </p>
            <p>
              By analyzing Core Vitals, you can identify bottlenecks in your website’s performance and make improvements that can boost user satisfaction and search rankings.
            </p>

            <h3>Download Your Report</h3>
            <p>
              You can download this detailed report as a PDF for free by clicking on the download button 'choose both view to see the download button'. Keep it for your records or share it with your team to improve your website's performance.
            </p>
      </div>
    <div className="page-speed-insights">
      <h1>Core Vitals Result</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-url"
        />
        <button onClick={fetchPageSpeedData} className="analyze-btn">
          Analyze
        </button>
      </div>

      {loading && renderLoadingScreen()}
      {error && <p className="error-text">{error}</p>}
      {data && (
        <div className="results-section">
          <div className="toggle-buttons">
            <button
              onClick={() => setView('mobile')}
              className={`toggle-btn ${view === 'mobile' ? 'active' : ''}`}
            >
              Mobile
            </button>
            <button
              onClick={() => setView('desktop')}
              className={`toggle-btn ${view === 'desktop' ? 'active' : ''}`}
            >
              Desktop
            </button>
            <button
              onClick={() => setView('both')}
              className={`toggle-btn ${view === 'both' ? 'active' : ''}`}
            >
              Both
            </button>
          </div>

          {view !== 'both' && (<div className="experience-toggle">
            <button
              onClick={() =>
                setExperienceView((prev) =>
                  prev === 'loadingExperience' ? 'originLoadingExperience' : 'loadingExperience'
                )
              }
              className="toggle-btn"
            >
              Switch to{' '}
              {experienceView === 'loadingExperience'
                ? 'Origin'
                : 'This Url'}
            </button>
          </div>)}

          <div className="timestamp">
            <p>
              <strong>Report from:</strong> {formatTimestamp(data[view]?.analysisUTCTimestamp)}
            </p>
          </div>

          {view === 'both' ? renderBothData() : renderData(view)}
        </div>
      )}

{/* Popup Form */}
{isPopupVisible && (
        <div className="popup-overlay">
          <PopupForm onSubmit={handleFormSubmission} setIsPopupVisible={setIsPopupVisible} />
        </div>
      )}

    </div>
    </>
  );
};

export default PageSpeedInsights;
