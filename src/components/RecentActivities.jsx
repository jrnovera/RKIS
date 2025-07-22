import React from 'react';

function RecentActivities() {
  return (
    <div className="second-container">
      <h2 className="section-title">Recent Activities</h2>
      <div className="recent-activities">
        <div className="activity-header">
          <p className="activity-subtitle">Latest Data Entry</p>
          <p className="activity-subtitle">Recent demographic record</p>
        </div>
        
        <div className="activity-item">
          <div className="activity-avatar"></div>
          <div className="activity-content">
            <h3 className="activity-name">Dela Cruz, Juan added</h3>
            <p className="activity-details">Age 35, Male, Brgy. San Jose Anyao, Level: High School Graduate.</p>
          </div>
        </div>
        
        <a href="#" className="view-entry">View Entry</a>
      </div>
    </div>
  );
}

export default RecentActivities;
