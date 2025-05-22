import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const MapComponent = ({ geoJsonData, countryDisplayData, selectedGroup }) => {
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.clearLayers().addData(geoJsonData);
    }
  }, [geoJsonData, selectedGroup]); // Re-render GeoJSON when data or filter changes

  const onEachFeature = (feature, layer) => {
    const countryName = feature.properties.ADMIN || feature.properties.name; // Adjust based on your GeoJSON
    const displayInfo = countryDisplayData[countryName];

    if (displayInfo) {
      if (selectedGroup !== "All" && displayInfo.groupName !== selectedGroup) {
        // If not "All" and country's winning group doesn't match selected, don't style or add popup
        layer.setStyle({
            fillColor: 'transparent', // or some default non-highlight color
            weight: 0.5,
            opacity: 0.3,
            color: 'grey',
            fillOpacity: 0.1
        });
        return;
      }

      layer.setStyle({
        fillColor: displayInfo.color,
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      });

      const stats = displayInfo.stats;
      const popupContent = `
        <strong>${countryName} (Group: ${stats.Group})</strong>
        <p>Up Votes: ${stats["Up Votes"]}</p>
        <p>Type: ${stats["Threat OR Opportunity"]}</p>
        <p>Time Posted: ${stats["Time Posted"]}</p>
        <p>Start Date: ${stats["Start Date"]}</p>
        <p>End Date: ${stats["End Date"]}</p>
        <p>Display Colour: ${stats["Display Colour"]}</p>
      `;
      layer.bindPopup(popupContent);
    } else {
        // Style for countries not in our data or filtered out by group mismatch (when not "All")
         layer.setStyle({
            fillColor: '#CCCCCC', // Default for countries not in data
            weight: 0.5,
            opacity: 0.3,
            color: 'grey',
            fillOpacity: 0.3
        });
    }
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoJsonData && (
        <GeoJSON 
          key={selectedGroup} // Force re-render of GeoJSON component when filter changes
          ref={geoJsonLayerRef} 
          data={geoJsonData} 
          onEachFeature={onEachFeature} 
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;