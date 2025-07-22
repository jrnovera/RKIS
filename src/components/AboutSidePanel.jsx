import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AboutContent from './about/AboutContent';
import './about/AboutContent.css';

function AboutSidePanel({ isOpen, onClose }) {
  const [activePage, setActivePage] = useState('who-we-are');
  const [showContent, setShowContent] = useState(false);
  
  // Reset content view when panel is closed
  useEffect(() => {
    if (!isOpen) {
      setShowContent(false);
    }
  }, [isOpen]);

  const handleMenuClick = (page) => (e) => {
    e.preventDefault();
    setActivePage(page);
    setShowContent(true);
  };

  if (!isOpen) return null;
  
  return (
    <div className="about-wrapper">
      <div className="about-side-panel open">
        <div className="about-header">
          <div className="about-icon"></div>
          <h2>About Us</h2>
        </div>
        <button className="about-close-btn" onClick={onClose}>&times;</button>

        <div className="about-menu">
          <a href="#" 
             onClick={handleMenuClick('who-we-are')} 
             className={`about-menu-item ${activePage === 'who-we-are' ? 'active' : ''}`}>
            Who We Are
          </a>
          <a href="#" 
             onClick={handleMenuClick('mission')} 
             className={`about-menu-item ${activePage === 'mission' ? 'active' : ''}`}>
            Our Mission
          </a>
          <a href="#" 
             onClick={handleMenuClick('what-we-do')} 
             className={`about-menu-item ${activePage === 'what-we-do' ? 'active' : ''}`}>
            What We Do
          </a>
          <a href="#" 
             onClick={handleMenuClick('why-it-matters')} 
             className={`about-menu-item ${activePage === 'why-it-matters' ? 'active' : ''}`}>
            Why It Matters
          </a>
          <a href="#" 
             onClick={handleMenuClick('values')} 
             className={`about-menu-item ${activePage === 'values' ? 'active' : ''}`}>
            Our Values
          </a>
          <a href="#" 
             onClick={handleMenuClick('team')} 
             className={`about-menu-item ${activePage === 'team' ? 'active' : ''}`}>
            Our Team
          </a>
          <a href="#" 
             onClick={handleMenuClick('join-us')} 
             className={`about-menu-item ${activePage === 'join-us' ? 'active' : ''}`}>
            Join Us
          </a>
        </div>
      </div>
      
      {showContent && (
        <div className="about-content-wrapper">
          <AboutContent activePage={activePage} />
        </div>
      )}
    </div>
  );
}

AboutSidePanel.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

AboutSidePanel.defaultProps = {
  isOpen: false,
  onClose: () => {}
};

export default AboutSidePanel;
