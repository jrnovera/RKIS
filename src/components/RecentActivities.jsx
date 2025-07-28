import React from 'react';

function RecentActivities() {
  return (
    <div className="recent-activities">
      <div className="activity-header">
        <p className="activity-subtitle">Latest Data Entry</p>
        <p className="activity-date">Recent Demographic Record</p>
      </div>
      
      <div className="activity-details">
        <div>
          <img src="" alt="" />
        <p><span className="detail-label">Name:</span> Juan Dela Cruz</p>
        <p><span className="detail-label">Age:</span> 35</p>
        <p><span className="detail-label">Location:</span> Barangay Pagkakaisa</p>
        <p><span className="detail-label">Status:</span> <span className="status-active">Active</span></p>
        </div>
      </div>
      
      <a href="#" className="view-entry">View Entry</a>
    </div>
  );
}

export default RecentActivities;
