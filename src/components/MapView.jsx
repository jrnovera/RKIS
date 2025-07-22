import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
  <div style={{
    color: 'white', 
    background: '#1E88E5',
    padding: '10px 15px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

function MapView() {
  const defaultProps = {
    center: {
      lat: 13.6545,
      lng: 122.3334
    },
    zoom: 11
  };

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} // You'll need to add your Google Maps API key here
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={13.6545}
          lng={122.3334}
          text="📍"
        />
      </GoogleMapReact>
    </div>
  );
}

export default MapView;
