import React, { useState, useEffect } from 'react';
import ProfileViewModal from './ProfileViewModal';
import { allBarangays } from './Brgylist';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

function TotalListIOfPopulation({ category = null }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('All Barangay');
  const [populationData, setPopulationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageTitle, setPageTitle] = useState('Total Population');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const allBarangayOptions = ['All Barangay', ...allBarangays.map(brgy => brgy.name)];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'indigenousPeople'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPopulationData(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category) {
      let title = 'Total Population';
      if (category === 'male') title = 'Total Male Population';
      else if (category === 'female') title = 'Total Female Population';
      else if (category === 'student') title = 'Total Students';
      else if (category === 'unemployed') title = 'Total Unemployed';
      else if (category === 'health_condition') title = 'With Health Condition';
      setPageTitle(title);
    }
  }, [category]);

  useEffect(() => {
    let filtered = [...populationData];

    if (category) {
      if (category === 'male') {
        filtered = filtered.filter(person => person.gender === 'Male');
      } else if (category === 'female') {
        filtered = filtered.filter(person => person.gender === 'Female');
      } else if (category === 'student') {
        filtered = filtered.filter(person => person.occupation === 'Student');
      } else if (category === 'unemployed') {
        filtered = filtered.filter(person => person.occupation === 'Unemployed');
      } else if (category === 'health_condition') {
        filtered = filtered.filter(person => person.healthCondition && person.healthCondition !== 'None');
      }
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBarangay !== 'All Barangay') {
      filtered = filtered.filter(person => person.barangay === selectedBarangay);
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedBarangay, populationData, category]);

  const openModal = (person) => {
    setSelectedPerson(person);
    setModalIsOpen(true);
  };

  const closeModal = () => {
      setModalIsOpen(false);
      setSelectedPerson(null);
  };

  return (
    <div>
        <div className="section-title">
            <h1>{pageTitle}</h1>
        </div>
        
        <div className="filter-section">
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
                value={selectedBarangay} 
                onChange={(e) => setSelectedBarangay(e.target.value)}
            >
                {allBarangayOptions.map((barangay, index) => (
                    <option key={index} value={barangay}>{barangay}</option>
                ))}
            </select>
        </div>
        
                <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Birthdate</th>
                    <th style={styles.th}>Age</th>
                    <th style={styles.th}>Gender</th>
                    <th style={styles.th}>Health Condition</th>
                    <th style={styles.th}>Barangay</th>
                    <th style={styles.th}>Action</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="7" style={{...styles.td, textAlign: 'center' }}>Loading...</td>
                    </tr>
                ) : filteredData.length > 0 ? (
                    filteredData.map((person, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{person.name}</td>
                            <td style={styles.td}>{person.birthdate}</td>
                            <td style={styles.td}>{person.age}</td>
                            <td style={styles.td}>{person.gender}</td>
                            <td style={styles.td}>{person.health_condition || 'N/A'}</td>
                            <td style={styles.td}>{person.barangay}</td>
                            <td style={styles.td}>
                                <button onClick={() => openModal(person)} className="view-profile">View Profile</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{...styles.td, textAlign: 'center' }}>No data found</td>
                    </tr>
                )}
            </tbody>
        </table>
        
        <ProfileViewModal 
            isOpen={modalIsOpen} 
            onClose={closeModal} 
            person={selectedPerson} 
        />
    </div>
  )
}

export default TotalListIOfPopulation;

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    },
    td: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
    },
};