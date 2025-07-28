import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';

function CommunityStats() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { icon: '👥', number: '0', label: 'Total Population', link: '/total-population', category: null },
    { icon: '👨', number: '0', label: 'Male', link: '/total-male', category: 'male' },
    { icon: '👩', number: '0', label: 'Female', link: '/total-female', category: 'female' },
    { icon: '📚', number: '0', label: 'Students', link: '/total-students', category: 'students' },
    { icon: '🚫', number: '0', label: 'Unemployed', link: '/total-unemployed', category: 'unemployed' },
    { icon: '❤️', number: '0', label: 'Health Condition', link: '/total-health-condition', category: 'health' }
  ]);
  
  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'indigenousPeople'));
        const querySnapshot = await getDocs(q);
        const ipData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Calculate counts
        const totalCount = ipData.length;
        const maleCount = ipData.filter(person => person.gender === 'Male').length;
        const femaleCount = ipData.filter(person => person.gender === 'Female').length;
        const studentsCount = ipData.filter(person => 
          person.occupation && person.occupation.toLowerCase().includes('student')
        ).length;
        const unemployedCount = ipData.filter(person => 
          person.occupation && person.occupation.toLowerCase().includes('unemployed')
        ).length;
        const healthConditionCount = ipData.filter(person => 
          person.healthCondition && person.healthCondition.trim() !== ''
        ).length;
        
        // Update stats with real counts
        setStats([
          { icon: '👥', number: totalCount.toString(), label: 'Total Population', link: '/total-population', category: null },
          { icon: '👨', number: maleCount.toString(), label: 'Male', link: '/total-male', category: 'male' },
          { icon: '👩', number: femaleCount.toString(), label: 'Female', link: '/total-female', category: 'female' },
          { icon: '📚', number: studentsCount.toString(), label: 'Students', link: '/total-students', category: 'students' },
          { icon: '🚫', number: unemployedCount.toString(), label: 'Unemployed', link: '/total-unemployed', category: 'unemployed' },
          { icon: '❤️', number: healthConditionCount.toString(), label: 'Health Condition', link: '/total-health-condition', category: 'health' }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

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
            onClick={() => navigate(`${stat.link}?category=${stat.category || ''}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityStats;
