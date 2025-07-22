import React from 'react';
import { useNavigate } from 'react-router-dom';

// Complete list of barangays in Catanauan
const allBarangays = [
  { id: 1, name: 'Ajos', population: 128, municipality: 'Catanauan' },
  { id: 2, name: 'Anusan', population: 42, municipality: 'Catanauan' },
  { id: 3, name: 'Barangay 1', population: 96, municipality: 'Catanauan' },
  { id: 4, name: 'Barangay 10', population: 75, municipality: 'Catanauan' },
  { id: 5, name: 'Barangay 2', population: 83, municipality: 'Catanauan' },
  { id: 6, name: 'Barangay 3', population: 91, municipality: 'Catanauan' },
  { id: 7, name: 'Barangay 4', population: 67, municipality: 'Catanauan' },
  { id: 8, name: 'Barangay 5', population: 72, municipality: 'Catanauan' },
  { id: 9, name: 'Barangay 6', population: 88, municipality: 'Catanauan' },
  { id: 10, name: 'Barangay 7', population: 94, municipality: 'Catanauan' },
  { id: 11, name: 'Barangay 8', population: 79, municipality: 'Catanauan' },
  { id: 12, name: 'Barangay 9', population: 85, municipality: 'Catanauan' },
  { id: 13, name: 'Bolo', population: 63, municipality: 'Catanauan' },
  { id: 14, name: 'Bulagsong', population: 58, municipality: 'Catanauan' },
  { id: 15, name: 'Camandilison', population: 71, municipality: 'Catanauan' },
  { id: 16, name: 'Canculajao', population: 66, municipality: 'Catanauan' },
  { id: 17, name: 'Catumbo', population: 82, municipality: 'Catanauan' },
  { id: 18, name: 'Cawayanin Ibaba', population: 96, municipality: 'Catanauan' },
  { id: 19, name: 'Cawayanin Ilaya', population: 89, municipality: 'Catanauan' },
  { id: 20, name: 'Cutcutan', population: 74, municipality: 'Catanauan' },
  { id: 21, name: 'Dahican', population: 68, municipality: 'Catanauan' },
  { id: 22, name: 'Doongan Ibaba', population: 77, municipality: 'Catanauan' },
  { id: 23, name: 'Doongan Ilaya', population: 81, municipality: 'Catanauan' },
  { id: 24, name: 'Gatasan', population: 69, municipality: 'Catanauan' },
  { id: 25, name: 'Macpac', population: 73, municipality: 'Catanauan' },
  { id: 26, name: 'Madulao', population: 84, municipality: 'Catanauan' },
  { id: 27, name: 'Matandang Sabang Kanluran', population: 92, municipality: 'Catanauan' },
  { id: 28, name: 'Matandang Sabang Silangan', population: 87, municipality: 'Catanauan' },
  { id: 29, name: 'Milagrosa', population: 76, municipality: 'Catanauan' },
  { id: 30, name: 'Navitas', population: 65, municipality: 'Catanauan' },
  { id: 31, name: 'Pacabit', population: 70, municipality: 'Catanauan' },
  { id: 32, name: 'San Antonio Magkupa', population: 86, municipality: 'Catanauan' },
  { id: 33, name: 'San Antonio Pala', population: 78, municipality: 'Catanauan' },
  { id: 34, name: 'San Isidro', population: 93, municipality: 'Catanauan' },
  { id: 35, name: 'San Jose Anyao', population: 128, municipality: 'Catanauan' },
  { id: 36, name: 'San Pablo', population: 80, municipality: 'Catanauan' },
  { id: 37, name: 'San Roque', population: 42, municipality: 'Catanauan' },
  { id: 38, name: 'San Vicente Kanluran', population: 90, municipality: 'Catanauan' },
  { id: 39, name: 'San Vicente Silangan', population: 95, municipality: 'Catanauan' },
  { id: 40, name: 'Santa Maria', population: 64, municipality: 'Catanauan' },
  { id: 41, name: 'Tagabas Ibaba', population: 75, municipality: 'Catanauan' },
  { id: 42, name: 'Tagabas Ilaya', population: 83, municipality: 'Catanauan' },
  { id: 43, name: 'Tagbacan Ibaba', population: 91, municipality: 'Catanauan' },
  { id: 44, name: 'Tagbacan Ilaya', population: 67, municipality: 'Catanauan' },
  { id: 45, name: 'Tagbacan Silangan', population: 72, municipality: 'Catanauan' },
  { id: 46, name: 'Tuhian', population: 88, municipality: 'Catanauan' },
];

function Brgylist({ limit = 3, onBarangaySelect = null }) {
  const navigate = useNavigate();
  
  // Display only the first 'limit' barangays or all if no limit
  const displayedBarangays = limit ? allBarangays.slice(0, limit) : allBarangays;

  const handleSeeDetails = (barangay) => {
    if (onBarangaySelect) {
      // If callback provided, use it (for SuperAdminDashboard)
      onBarangaySelect(barangay);
    } else {
      // Otherwise navigate to details page
      navigate(`/total-population?barangay=${barangay.name}`);
    }
  };

  return (
    <div className="barangay-section">
      {displayedBarangays.map((barangay) => (
        <div className="barangay-card" key={barangay.id}>
          <div className="barangay-image"></div>
          <h3 className="barangay-title">Barangay {barangay.name}</h3>
          <p className="barangay-population">A total population of {barangay.population}</p>
          <a 
            href="#" 
            className="see-details" 
            onClick={(e) => {
              e.preventDefault();
              handleSeeDetails(barangay);
            }}
          >
            See Details ➜
          </a>
        </div>
      ))}
    </div>
  );
}

export { allBarangays };
export default Brgylist;