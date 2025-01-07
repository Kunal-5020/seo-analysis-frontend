import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SEOAnalysis from './components/SEOAnalysis/SEOAnalysis';
import Navbar from './components/navbar/navbar';
import SEOAnalysis2 from './components/Add-on SEOAnalysis/SEOAnalysis2';
import PageSpeedInsights from './components/CoreVitals/CoreVitals';
import './App.css';
import './components/styles/loadingscreen.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<SEOAnalysis />} />
            <Route path="/add-on" element={<SEOAnalysis2/>} />
            <Route path="/core-vitals" element={<PageSpeedInsights />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
