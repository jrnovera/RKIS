import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './SuperAdminDashboard.css';
import Navbar from '../components/Navbar';
import { allBarangays } from '../components/Brgylist';
import IPFormModal from '../components/IPFormModal';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

function SuperAdminDashboard() {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [ipList, setIpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBarangay, setSelectedBarangay] = useState(null);
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedIp, setSelectedIp] = useState(null);
  
  // No need for formData state here as it's moved to IPFormModal component
  
  // Fetch IPs from Firestore based on selected barangay
  const fetchIPs = async (barangayFilter = null) => {
    try {
      setLoading(true);
      let ipsQuery;
      
      if (barangayFilter) {
        // If barangay filter is provided, query IPs from that barangay
        ipsQuery = query(
          collection(db, 'indigenousPeople'),
          where('barangay', '==', barangayFilter)
        );
      } else {
        // Otherwise, get all IPs
        ipsQuery = collection(db, 'indigenousPeople');
      }
      
      const ipsSnapshot = await getDocs(ipsQuery);
      const ipsList = ipsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        name: `${doc.data().lastName}, ${doc.data().firstName} ${doc.data().middleName || ''}`
      }));
      
      setIpList(ipsList);
    } catch (error) {
      console.error('Error fetching IPs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of IPs
  useEffect(() => {
    fetchIPs(selectedBarangay?.name);
  }, [selectedBarangay]);
  
  // Handle barangay selection change
  const handleBarangayChange = (e) => {
    const barangayName = e.target.value;
    if (barangayName === "") {
      setSelectedBarangay(null);
    } else {
      const selectedBrgy = allBarangays.find(brgy => brgy.name === barangayName);
      setSelectedBarangay(selectedBrgy);
    }
    fetchIPs(barangayName === "" ? null : barangayName);
  };

  // Clear barangay filter
  const clearBarangayFilter = () => {
    setSelectedBarangay(null);
    fetchIPs();
  };

  // Open add form
  const handleAdd = () => {
    setShowAddForm(true);
  };

  // Submit add form
  const handleAddSubmit = async (formData) => {
    try {
      // Add new IP to Firestore
      const docRef = await addDoc(collection(db, 'indigenousPeople'), formData);
      
      // Refresh the IP list to include the new entry
      fetchIPs(selectedBarangay?.name);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding IP:', error);
    }
  };

  // Close forms
  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
  };

  // Select IP for update
  const handleUpdate = (ip) => {
    setSelectedIp(ip);
    setShowUpdateForm(true);
  };

  // Submit update form
  const handleUpdateSubmit = async (formData) => {
    if (!selectedIp) return;
    
    try {
      // Update IP in Firestore
      const ipRef = doc(db, 'indigenousPeople', selectedIp.id);
      await updateDoc(ipRef, formData);
      
      // Refresh the IP list to show updated data
      fetchIPs(selectedBarangay?.name);
      
      setShowUpdateForm(false);
      setSelectedIp(null);
    } catch (error) {
      console.error('Error updating IP:', error);
    }
  };

  // Delete IP
  const handleDelete = async (ip) => {
    if (!window.confirm(`Are you sure you want to delete ${ip.name}?`)) return;
    
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'indigenousPeople', ip.id));
      
      // Delete from local state
      setIpList(ipList.filter(item => item.id !== ip.id));
    } catch (error) {
      console.error('Error deleting IP:', error);
    }
  };

  // Filter the list based on search term
  const filteredList = ipList.filter(ip => 
    (ip.lastName + ', ' + ip.firstName + ' ' + (ip.middleName || '')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="super-admin-dashboard">
      <Navbar />
      <div className="dashboard-header">
        <h1>{selectedBarangay ? `Barangay ${selectedBarangay.name}` : 'All Barangays'}</h1>
        <div className="dashboard-controls">
          <div className="barangay-filter">
            <select 
              className="barangay-dropdown" 
              value={selectedBarangay ? selectedBarangay.name : ""}
              onChange={handleBarangayChange}
            >
              <option value="">All Barangays</option>
              {allBarangays.map(brgy => (
                <option key={brgy.id} value={brgy.name}>{brgy.name}</option>
              ))}
            </select>
            {selectedBarangay && (
              <button className="clear-filter" onClick={clearBarangayFilter}>Clear Filter</button>
            )}
          </div>
        </div>
        <div className="action-buttons">
        <button className="action-button add-button" onClick={handleAdd}>Add IP</button>
      </div>  
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="ip-list">
        <h2>
          {selectedBarangay 
            ? `Barangay ${selectedBarangay.name} Catanauan,Quezon Listof IP's` 
            : 'All Indigenous People in Catanauan, Quezon'}
        </h2>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : ipList.length === 0 ? (
          <p className="no-data">No records found{selectedBarangay ? ` in ${selectedBarangay.name}` : ''}.</p>
        ) : (
          <ol>
            {ipList
              .filter(ip => searchTerm === '' || 
                ip.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((ip) => (
                <li key={ip.id} className="ip-list-item">
                  {ip.name}
                  <div className="item-actions">
                    <button className="item-action-btn edit-btn" onClick={() => handleUpdate(ip)}>Edit</button>
                    <button className="item-action-btn delete-btn" onClick={() => handleDelete(ip)}>Delete</button>
                  </div>
                </li>
              ))}
          </ol>
        )}
      </div>

     

      {/* Add IP Form Modal */}
      <IPFormModal 
        isOpen={showAddForm}
        onClose={handleCloseForm}
        onSubmit={handleAddSubmit}
        selectedBarangay={selectedBarangay}
      />

      {/* Update IP Form Modal */}
      <IPFormModal 
        isOpen={showUpdateForm}
        onClose={handleCloseForm}
        onSubmit={handleUpdateSubmit}
        initialData={selectedIp}
        isEditing={true}
      />
    </div>
  );
}

export default SuperAdminDashboard;
