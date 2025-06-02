import axios from 'axios';

const API_KEY = '5e01e5e5b5a04b53bc89451d07547496'; 
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
 async function forwardGeocoding(startLocation, endLocation) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(startLocation)}&${encodeURI(endLocation)}&key=${API_KEY}`;
    const response = await axios.get(url);
    delay(1000)
    console.log(response.data.results[0].geometry.lat);
    console.log(response.data.results[0].geometry.lng);

  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  } 
}

export default forwardGeocoding;