
// Helper to parse DD/MM/YYYY dates
const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  
  // Helper to parse HH:MM time (we'll create a date object for comparison, year/month/day don't matter)
  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date;
  };
  
  
  export const initialGroupDataRaw = [
    {
      Group: "Billions",
      "Countries in Group": "USA; Russia",
      "Up Votes": 91,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "21:00",
      "Start Date": "18/05/2025",
      "End Date": "11/10/2025",
      "Display Colour": "Red",
    },
    {
      Group: "Orange",
      "Countries in Group": "Russia; China; India; Nigeria; Algeria",
      "Up Votes": 88,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "10:00",
      "Start Date": "12/05/2025",
      "End Date": "05/10/2025",
      "Display Colour": "Green", 
    },
    {
      Group: "Lion",
      "Countries in Group": "Germany; Ethiopia; USA; Russia; China; India; Nigeria; Algeria; Ghana; Egypt",
      "Up Votes": 57,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "14:00",
      "Start Date": "03/05/2025",
      "End Date": "26/09/2025",
      "Display Colour": "Blue",
    },
    {
      Group: "Potato",
      "Countries in Group": "Germany; Ethiopia; USA; Russia; China; India; Nigeria; Algeria",
      "Up Votes": 45,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "12:00",
      "Start Date": "05/05/2025",
      "End Date": "28/09/2025",
      "Display Colour": "Yellow",
    },
    {
      Group: "Shoes",
      "Countries in Group": "Egypt; Brazil; Chile",
      "Up Votes": 45,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "22:00",
      "Start Date": "17/05/2025",
      "End Date": "10/10/2025",
      "Display Colour": "Gold",
    },
    {
      Group: "Soap",
      "Countries in Group": "Germany; Ethiopia; USA; Russia; China; India",
      "Up Votes": 34,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "12:00",
      "Start Date": "08/05/2025",
      "End Date": "01/10/2025",
      "Display Colour": "Brown",
    },
    {
      Group: "Bottle",
      "Countries in Group": "Ghana; Egypt; Brazil; Chile",
      "Up Votes": 34,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "12:00",
      "Start Date": "13/05/2025",
      "End Date": "06/10/2025",
      "Display Colour": "Light Blue",
    },
    {
      Group: "Tiger",
      "Countries in Group": "Nigeria; Algeria; Ghana",
      "Up Votes": 31,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "12:00",
      "Start Date": "16/05/2025",
      "End Date": "09/10/2025",
      "Display Colour": "Deep Blue",
    },
    {
      Group: "Mango",
      "Countries in Group": "Germany; Ethiopia; USA; Nigeria; Algeria; Ghana; Egypt; Brazil",
      "Up Votes": 30,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "10:00",
      "Start Date": "04/05/2025",
      "End Date": "27/09/2025",
      "Display Colour": "Yellow",
    },
    {
      Group: "Rice",
      "Countries in Group": "Ethiopia; Nigeria; Algeria; Ghana; Egypt;",
      "Up Votes": 30,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "08:30",
      "Start Date": "07/05/2025",
      "End Date": "30/09/2025",
      "Display Colour": "Dark Red",
    },
    {
      Group: "Red",
      "Countries in Group": "Germany; Ethiopia; USA; Russia; China",
      "Up Votes": 30,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "21:00",
      "Start Date": "10/05/2025",
      "End Date": "03/10/2025",
      "Display Colour": "Green",
    },
    {
      Group: "Black",
      "Countries in Group": "USA; Russia; China; India; Nigeria; Algeria; Ghana; Egypt; Brazil; Chile",
      "Up Votes": 28,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "13:00",
      "Start Date": "02/05/2025",
      "End Date": "25/09/2025",
      "Display Colour": "Red",
    },
    {
      Group: "Aeroplane",
      "Countries in Group": "USA; Nigeria; Algeria; Ghana; Egypt; Brazil; Chile",
      "Up Votes": 25,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "08:30",
      "Start Date": "15/05/2025",
      "End Date": "08/10/2025",
      "Display Colour": "Brown",
    },
    {
      Group: "Ball",
      "Countries in Group": "Ghana; Egypt; Brazil; Chile",
      "Up Votes": 23,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "22:00",
      "Start Date": "09/05/2025",
      "End Date": "02/10/2025",
      "Display Colour": "Blue",
    },
    {
      Group: "White",
      "Countries in Group": "Germany; Ethiopia; USA; Russia; China; India; Nigeria; Algeria; Ghana; Egypt; Brazil; Chile",
      "Up Votes": 20,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "12:00",
      "Start Date": "01/05/2025",
      "End Date": "24/09/2025",
      "Display Colour": "Yellow",
    },
    {
      Group: "Twenty",
      "Countries in Group": "India; Nigeria; Algeria; Ghana; Egypt; Brazil; Chile",
      "Up Votes": 17,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "04:00",
      "Start Date": "20/05/2025",
      "End Date": "13/10/2025",
      "Display Colour": "Grey",
    },
    {
      Group: "Green",
      "Countries in Group": "Germany; Ethiopia; USA; Russia",
      "Up Votes": 13,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "01:00",
      "Start Date": "11/05/2025",
      "End Date": "04/10/2025",
      "Display Colour": "Deep Blue",
    },
    {
      Group: "Ten",
      "Countries in Group": "Russia; China; India; Nigeria; Algeria; Ghana; Egypt; Brazil; Chile",
      "Up Votes": 12,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "01:00",
      "Start Date": "19/05/2025",
      "End Date": "12/10/2025",
      "Display Colour": "Green",
    },
    {
      Group: "Africa",
      "Countries in Group": "China; India; Nigeria; Algeria; Ghana; Egypt; Brazil; Chile",
      "Up Votes": 10,
      "Threat OR Opportunity": "Opp",
      "Time Posted": "09:00",
      "Start Date": "06/05/2025",
      "End Date": "29/09/2025",
      "Display Colour": "Light Blue",
    },
    {
      Group: "Wine",
      "Countries in Group": "Germany; Egypt; Brazil; Chile",
      "Up Votes": 10,
      "Threat OR Opportunity": "Threat",
      "Time Posted": "09:00",
      "Start Date": "14/05/2025",
      "End Date": "07/10/2025",
      "Display Colour": "Dark Red",
    },
  ].map(item => ({
    ...item,
    parsedCountries: item["Countries in Group"].split(';').map(c => c.trim()).filter(c => c),
    parsedTimePosted: parseTime(item["Time Posted"]),
    parsedStartDate: parseDate(item["Start Date"]),
    parsedEndDate: parseDate(item["End Date"]),
  }));
  


// Process the raw data to include parsed fields
export const initialGroupData = initialGroupDataRaw.map(item => ({ // Assuming initialGroupDataRaw is the array from your image
  ...item,
  parsedCountries: item["Countries in Group"].split(';').map(c => c.trim()).filter(c => c),
  parsedTimePosted: parseTime(item["Time Posted"]),
  parsedStartDate: parseDate(item["Start Date"]),
  parsedEndDate: parseDate(item["End Date"]),
}));

// Mapping from your data's country names to GeoJSON country names
export const countryNameMap = {
  "USA": "United States of America",
  "Russia": "Russia", 
  "China": "China",
  "India": "India",
  "Nigeria": "Nigeria",
  "Algeria": "Algeria",
  "Germany": "Germany",
  "Ethiopia": "Ethiopia",
  "Ghana": "Ghana",
  "Egypt": "Egypt",
  "Brazil": "Brazil",
  "Chile": "Chile",
};

// Create a reverse map: GeoJSON name to Short name
export const geoJsonToShortNameMap = Object.fromEntries(
  Object.entries(countryNameMap).map(([short, geo]) => [geo, short])
);
