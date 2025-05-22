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

const defaultStyle = {
    fillColor: '#CCCCCC', 
    weight: 0.5,
    opacity: 0.4,
    color: 'grey',
    fillOpacity: 0.2
};

const highlightedStyleBase = { 
    weight: 1,
    opacity: 1,
    color: 'white', 
    dashArray: '3',
    fillOpacity: 0.7
};

const MapComponent = ({
  geoJsonData,
  countryDisplayData,     
  initialGroupData,       // For specific group view
  geoJsonToShortNameMap,  // For mapping GeoJSON name back to short name
  selectedGroup
}) => {
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    if (geoJsonLayerRef.current && geoJsonData) {
      geoJsonLayerRef.current.clearLayers().addData(geoJsonData);
    }
  }, [geoJsonData]);

  const onEachFeature = (feature, layer) => {
    const geoJsonCountryName = feature.properties.ADMIN || feature.properties.name; 
    const shortCountryName = geoJsonToShortNameMap[geoJsonCountryName];

    let styleToApply = { ...defaultStyle }; 
    let popupContent = null;

    if (selectedGroup === "All") {
        const displayInfo = countryDisplayData[geoJsonCountryName];
        if (displayInfo) {
            styleToApply = {
                ...highlightedStyleBase,
                fillColor: displayInfo.color,
            };
            const stats = displayInfo.stats; 
            popupContent = `
                <strong>${geoJsonCountryName} (Priority Group: ${stats.Group})</strong>
                <p>Up Votes: ${stats["Up Votes"]}</p>
                <p>Type: ${stats["Threat OR Opportunity"]}</p>
                <p>Time Posted: ${stats["Time Posted"]}</p>
                <p>Start Date: ${stats["Start Date"]}</p>
                <p>End Date: ${stats["End Date"]}</p>
                <p>Display Colour: ${stats["Display Colour"]}</p>
            `;
        }
    } else {
        // Specific group selected: Check if this country is a member of the selected group
        const groupDataEntryForSelected = initialGroupData.find(g => g.Group === selectedGroup);

        if (groupDataEntryForSelected && shortCountryName && groupDataEntryForSelected.parsedCountries.includes(shortCountryName)) {
            // This country IS part of the currently selected group
            styleToApply = {
                ...highlightedStyleBase,
                fillColor: groupDataEntryForSelected["Display Colour"], // Use selected group's color
            };
            const stats = groupDataEntryForSelected; // Use selected group's stats
            popupContent = `
                <strong>${geoJsonCountryName} (Viewing Group: ${stats.Group})</strong>
                <p>Countries in this group entry: ${stats["Countries in Group"]}</p>
                <p>Up Votes (for this group): ${stats["Up Votes"]}</p>
                <p>Type (for this group): ${stats["Threat OR Opportunity"]}</p>
                <p>Time Posted (for this group): ${stats["Time Posted"]}</p>
                <p>Start Date (for this group): ${stats["Start Date"]}</p>
                <p>End Date (for this group): ${stats["End Date"]}</p>
                <p>Display Colour (for this group): ${stats["Display Colour"]}</p>
                <p style="font-size:0.8em; color: #555;">(In 'All' view, this country might show info from a different priority group)</p>
            `;
        }
    }

    layer.setStyle(styleToApply);

    if (popupContent) {
        layer.bindPopup(popupContent);
    } else {
        if (layer.getPopup()) {
            layer.unbindPopup();
        }
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
          key={selectedGroup + JSON.stringify(geoJsonData)} 
          ref={geoJsonLayerRef}
          data={geoJsonData}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;