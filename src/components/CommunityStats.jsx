import React from 'react';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';

function CommunityStats() {
  const navigate = useNavigate();
  const stats = [
    { icon: '👥', number: '266', label: 'Total Population', link: '/total-population' },
    { icon: '👨', number: '97', label: 'Male', link: '/total-male' },
    { icon: '👩', number: '169', label: 'Female', link: '/total-female' },
    { icon: '📚', number: '28', label: 'Students', link: '/total-students' },
    { icon: '🚫', number: '34', label: 'Unemployed', link: '/total-unemployed' },
    { icon: '❤️', number: '76', label: 'Health Condition', link: '/total-health-condition' }
  ];

  return (
    <div className="first-container">
      <h2 className="section-title">Community Statistics</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
           onClick={() => navigate(stat.link)}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityStats;
