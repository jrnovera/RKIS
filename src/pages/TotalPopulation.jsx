import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TotalListIOfPopulation from '../components/TotalListIOfPopulation';
import { useLocation, useParams } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';

function TotalPopulation() {
  // Get category from URL parameters
  const { category } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || category;
  
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'indigenousPeople'));
        const querySnapshot = await getDocs(q);
        const ipData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Unknown',
            birthdate: data.birthdate || 'Unknown',
            age: data.age || 'Unknown',
            gender: data.gender || 'Unknown',
            healthCondition: data.healthCondition || 'None',
            barangay: data.barangay || 'Unknown',
            occupation: data.occupation || 'Unknown',
            onViewProfile: (person) => console.log("View profile of", person.name)
          };
        });
        setPopulationData(ipData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
 

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TotalListIOfPopulation 
            populationData={populationData.length > 0 ? populationData : samplePopulationData} 
            category={categoryParam} 
          />
        )}
      </div>
    </div>
  );
}

export default TotalPopulation;
