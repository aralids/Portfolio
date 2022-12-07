let latitude;
let longitude;
let address = $("main").attr("data-url");
console.log("address: ", address);

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        method: 'POST',
        url: address,
        data: {geoloc: `${latitude} ${longitude}`},
        datatype: "text",
        headers: {
            "X-CSRFToken": csrftoken,
        },
        success: function (response) {
            console.log(response)
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
};


getLocation();


