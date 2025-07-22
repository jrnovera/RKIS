import React, { useState, useEffect } from 'react';
import './TotalListIOfPopulation.css';

function TotalListIOfPopulation({ populationData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('All Barangay');
  const [filteredData, setFilteredData] = useState([]);
  
  // Get unique barangays for the dropdown
  const uniqueBarangays = ['All Barangay', ...new Set(populationData?.map(person => person.barangay) || [])];
  
  // Filter data based on search term and selected barangay
  useEffect(() => {
    if (!populationData) return;
    
    let filtered = [...populationData];
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by barangay
    if (selectedBarangay !== 'All Barangay') {
      filtered = filtered.filter(person => 
        person.barangay === selectedBarangay
      );
    }
    
    setFilteredData(filtered);
  }, [searchTerm, selectedBarangay, populationData]);
  
  return (
    <div className="total-population-container">
      <h1 className="total-population-title">Total Population</h1>
      
      <div className="search-filter-container">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search Here..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select 
            value={selectedBarangay} 
            onChange={(e) => setSelectedBarangay(e.target.value)}
            className="barangay-select"
          >
            {uniqueBarangays.map((barangay, index) => (
              <option key={index} value={barangay}>{barangay}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="table-container">
        <table className="population-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Health Condition</th>
              <th>Barangay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((person, index) => (
                <tr key={index}>
                  <td>{person.name}</td>
                  <td>{person.birthdate}</td>
                  <td>{person.age}</td>
                  <td>{person.gender}</td>
                  <td>{person.healthCondition || 'None'}</td>
                  <td>{person.barangay}</td>
                  <td>
                    <button className="view-profile-btn" onClick={() => person.onViewProfile && person.onViewProfile(person)}>View Profile</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TotalListIOfPopulation;