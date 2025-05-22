import React, { useState, useEffect, useMemo } from 'react';
import { initialGroupData, countryNameMap } from './data';
import { processCountryPriorities } from './priorityHelper';
import MapComponent from './MapComponent';
import geoJson from "./data/countries.geo.json"

function App() {
  const [geoJsonData, setGeoJsonData] = useState(geoJson);
  const [selectedGroup, setSelectedGroup] = useState("All");

  const countryDisplayData = useMemo(() => {
    return processCountryPriorities(initialGroupData, countryNameMap);
  }, []);

  const groupNames = useMemo(() => {
    const names = new Set(initialGroupData.map(g => g.Group));
    return ["All", ...Array.from(names).sort()];
  }, []); 


  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  if (!geoJsonData) {
    return <div>Loading map data...</div>;
  }

  return (
    <div className="App">
      <div className="controls">
        <label htmlFor="group-select">Select Group:</label>
        <select id="group-select" value={selectedGroup} onChange={handleGroupChange}>
          {groupNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <MapComponent
        geoJsonData={geoJsonData}
        countryDisplayData={countryDisplayData}
        selectedGroup={selectedGroup}
      />
    </div>
  );
}

export default App;