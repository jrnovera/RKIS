import React from 'react';

function StatCard({ icon, number, label, onClick }) {
  return (
    <div className="stat-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default StatCard;
