import React from 'react';
import Navbar from '../components/Navbar';
import CommunityStats from '../components/CommunityStats';
import RecentActivities from '../components/RecentActivities';
import SearchBar from '../components/SearchBar';
import Brgylist from '../components/Brgylist';
import LocationMap from '../components/LocationMap';

function Homepage() {
    
  return (
    <div className="container homepage-background">
      <Navbar />
      
      <div className="dashboard-layout">
        {/* Left Column - Statistics & Activities */}
        <div className="left-column">
          <CommunityStats />
          <h1 style={{ textAlign: 'left' }}>Recent Activities</h1>
          <RecentActivities />
        </div>
        
        {/* Right Column - Search, Barangays & Map */}
        <div className="right-column">
          <SearchBar />
          <Brgylist />
          <LocationMap />
        </div>
      </div>
    </div>
  );
}

export default Homepage;