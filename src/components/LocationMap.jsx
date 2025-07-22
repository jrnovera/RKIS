import React from 'react';
import MapView from './MapView';

function LocationMap() {
  return (
    <section className="map-section">
      <h3 className="map-title">Location Map</h3>
      <p className="map-coordinates">Coordinates: 13.6545° N, 122.3334° E</p>
      <MapView />
    </section>
  );
}

export default LocationMap;
