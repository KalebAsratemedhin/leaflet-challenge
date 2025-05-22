/**
 * Determines which group takes priority based on the rules.
 * @param {Object} groupA
 * @param {Object} groupB
 * @returns {Object} The group with higher priority
 */
export function getHigherPriorityGroup(groupA, groupB) {
    // 1. Up Votes (higher is better)
    if (groupA["Up Votes"] !== groupB["Up Votes"]) {
      return groupA["Up Votes"] > groupB["Up Votes"] ? groupA : groupB;
    }
  
    // 2. Threats (Threat > Opp)
    const isThreatA = groupA["Threat OR Opportunity"] === "Threat";
    const isThreatB = groupB["Threat OR Opportunity"] === "Threat";
    if (isThreatA !== isThreatB) {
      return isThreatA ? groupA : groupB;
    }
  
    // 3. Time Posted (earliest is better)
    if (groupA.parsedTimePosted.getTime() !== groupB.parsedTimePosted.getTime()) {
      return groupA.parsedTimePosted.getTime() < groupB.parsedTimePosted.getTime() ? groupA : groupB;
    }
  
    // 4. Start Date (soonest/earliest is better)
    if (groupA.parsedStartDate.getTime() !== groupB.parsedStartDate.getTime()) {
      return groupA.parsedStartDate.getTime() < groupB.parsedStartDate.getTime() ? groupA : groupB;
    }
  
    // 5. End Date (soonest/earliest is better - "closest to current time" for future dates means earliest)
    // If dates could be in the past, this logic would need adjustment for "closest to current time".
    // Assuming future dates, "soonest" is the interpretation.
    if (groupA.parsedEndDate.getTime() !== groupB.parsedEndDate.getTime()) {
      return groupA.parsedEndDate.getTime() < groupB.parsedEndDate.getTime() ? groupA : groupB;
    }
  
    // If all are equal, default to A (or handle as per further tie-breaking if any)
    return groupA;
  }
  
  /**
   * Processes the initial group data to determine the winning group for each country.
   * @param {Array<Object>} groupData - The initial data parsed with dates.
   * @returns {Object} - An object where keys are GeoJSON country names and values are { color, stats, groupName }
   */
  export function processCountryPriorities(groupData, countryNameMapping) {
    const countryDisplayInfo = {}; // Key: GeoJSON Country Name
  
    groupData.forEach(group => {
      group.parsedCountries.forEach(countryNameFromData => {
        const geoJsonCountryName = countryNameMapping[countryNameFromData] || countryNameFromData; // Map to GeoJSON name
  
        if (!countryDisplayInfo[geoJsonCountryName]) {
          countryDisplayInfo[geoJsonCountryName] = {
            color: group["Display Colour"],
            stats: group, // Store the whole group object for stats
            groupName: group.Group,
          };
        } else {
          const existingGroup = countryDisplayInfo[geoJsonCountryName].stats;
          const winningGroup = getHigherPriorityGroup(existingGroup, group);
          countryDisplayInfo[geoJsonCountryName] = {
            color: winningGroup["Display Colour"],
            stats: winningGroup,
            groupName: winningGroup.Group,
          };
        }
      });
    });
    return countryDisplayInfo;
  }