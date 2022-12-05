let latitude;
let longitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(assignGeoValues);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function assignGeoValues(position) {
  console.log("position: ", position);
  latitude = position.coords.latitude; 
  longitude = position.coords.longitude;
  console.log(latitude, longitude)
}

getLocation();
