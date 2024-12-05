import React from 'react';

// Import the required components
import ImageTags from './ImageTags.js';
import SocialNetworks from './SocialNetworks.js';
import Custom404 from './Custom404Page.js';
import Domains from './Domains.js';
import HeadingTags from './HeadingTags.js';
import MetaTags from './MetaTags.js';
import Indexation from './Indexation.js';
import Links from './Links.js';
import SearchOptimization from './SearchOptimization.js';
import Security from './Security.js';
import TwitterCards from './TwitterCards.js';
import OpenGraphs from './OpenGraphs.js'
import URLVulnerability from './URLVulnerability.js';

const Part = ({ partName, result, url }) => {
  // Function to render a table based on the result object or array
  const renderTable = (item, index) => {
    const tableHeaders = Object.keys(item);
    const rows = tableHeaders.map((key) => {
      const value = item[key];
      const isGoodForSEO = value && value !== 'Not Found' && value !== 'None';
      const statusSymbol = isGoodForSEO ? '✔️' : '❌';
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
          <td>{statusSymbol}</td>
        </tr>
      );
    });

    return (
      <table key={index}>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  // If "All" is selected, render all parts at once
  if (partName === "All") {
    return (
      <div className="all-parts">
        <h2>SEO Analysis Report</h2>

        {/* Meta Tags */}
        <div className="part">
          {Array.isArray(result.MetaTags) ? result.MetaTags.map((item, index) => renderTable(item, index)) : renderTable(result.MetaTags, 0)}
        </div>

        {/* Twitter Cards */}
        <div className="part">
          {Array.isArray(result.TwitterCards) ? result.TwitterCards.map((item, index) => renderTable(item, index)) : renderTable(result.TwitterCards, 0)}
        </div>

        {/* Open Graph */}
        <div className="part">
          {Array.isArray(result.OpenGraph) ? result.OpenGraph.map((item, index) => renderTable(item, index)) : renderTable(result.OpenGraph, 0)}
        </div>

        {/* Image Tags */}
        <div className="part">
          {Array.isArray(result.ImageTags) ? result.ImageTags.map((item, index) => renderTable(item, index)) : renderTable(result.ImageTags, 0)}
        </div>

        {/* Indexation */}
        <div className="part">
          {Array.isArray(result.Indexation) ? result.Indexation.map((item, index) => renderTable(item, index)) : renderTable(result.Indexation, 0)}
        </div>

        {/* Links */}
        <div className="part">
          {Array.isArray(result.Links) ? result.Links.map((item, index) => renderTable(item, index)) : renderTable(result.Links, 0)}
        </div>

        {/* Search Optimization */}
        <div className="part">
          {Array.isArray(result.SearchOptimization) ? result.SearchOptimization.map((item, index) => renderTable(item, index)) : renderTable(result.SearchOptimization, 0)}
        </div>

        {/* URL Vulnerability */}
        <div className="part">
          {Array.isArray(result.URLVulnerability) ? result.URLVulnerability.map((item, index) => renderTable(item, index)) : renderTable(result.URLVulnerability, 0)}
        </div>

        {/* Social Networks */}
        <div className="part">
          {Array.isArray(result.SocialNetworks) ? result.SocialNetworks.map((item, index) => renderTable(item, index)) : renderTable(result.SocialNetworks, 0)}
        </div>

        {/* Custom 404 Page */}
        <div className="part">
          {Array.isArray(result.Custom404) ? result.Custom404.map((item, index) => renderTable(item, index)) : renderTable(result.Custom404, 0)}
        </div>

        {/* Domains */}
        <div className="part">
          {Array.isArray(result.Domains) ? result.Domains.map((item, index) => renderTable(item, index)) : renderTable(result.Domains, 0)}
        </div>

        {/* Heading Tags */}
        <div className="part">
          {Array.isArray(result.HeadingTags) ? result.HeadingTags.map((item, index) => renderTable(item, index)) : renderTable(result.HeadingTags, 0)}
        </div>

        {/* Security */}
        <div className="part">
          {Array.isArray(result.Security) ? result.Security.map((item, index) => renderTable(item, index)) : renderTable(result.Security, 0)}
        </div>
      </div>
    );
  }

  // Check if the partName matches any of the imported components
  switch (partName) {
    case 'Image Tags':
      return <ImageTags result={result} />;
    case 'Social Networks':
      return <SocialNetworks result={result} />;
    case 'Custom 404 Page':
      return <Custom404 result={result} />;
    case 'Domains':
      return <Domains result={result} />;
    case 'Heading Tags':
      return <HeadingTags result={result} />;
    case 'Meta Tags':
      return <MetaTags result={result} />;
    case 'Indexation':
      return <Indexation result={result} />;
    case 'Links':
      return <Links result={result} />;
    case 'Search Optimization':
      return <SearchOptimization result={result} />;
    case 'Security':
      return <Security result={result} />;
    case 'Twitter Cards':
      return <TwitterCards result={result} />;
    case 'Open Graph':
      return <OpenGraphs result={result} />;
    case 'URL Vulnerability':
      return <URLVulnerability result={result} />;
    default:
      // If partName does not match, create the table on its own
      return (
        <div className="part">
          <h2>{partName}</h2>
          {Array.isArray(result)
            ? result.map((item, index) => renderTable(item, index)) // If it's an array, render multiple tables
            : renderTable(result, 0)} {/* If it's an object, render one table */}
        </div>
      );
  }
};

export default Part;
