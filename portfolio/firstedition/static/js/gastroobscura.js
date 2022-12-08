let latitude;
let longitude;
let address = $("main").attr("data-url");
let places = {}
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
            places = response; 
            console.log("places: ", places);
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    });
};

function inRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}



getLocation();

'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return ( 
            <div className="place" onClick={props.onClick} top={props.top} left={props.left}>
                <img src={props.frontImage}></img>
            </div>
        );
    }
    
}

class PlaceSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: places,
            placesTop: [],
            placesLeft: [],
            placesFrontImageLink: []
        };
        this.getPlacesData();
    }

    getPlacesData() {
        let cx = document.getElementsByClassName("gmap_canvas").offsetTop;
        let cy = document.getElementsByClassName("gmap_canvas").offsetLeft;

        let numOfPlaces = Object.keys(this.state.places).length;
        let placesDegrees;
        if (numOfPlaces % 2 === 1) {
            placesDegrees = [180];
        } else {
            placesDegrees = [165, 195];
        }
        for (let i=0; i<(numOfPlaces-1)/2; i++) {
            placesDegrees.push(placesDegrees[placesDegrees.length-1] + 30)
            placesDegrees.unshift(placesDegrees[0] - 30)
        }

        let placesCentres = placesDegrees.map(item => [cx + 200*Math.cos(inRadians(item)), cy + 200*Math.sin(inRadians(item))]);

        this.state.placesLeft = placesCentres.map(item => item[0] - 50);
        this.state.placesTop = placesCentres.map(item => item[1] - 50);

        for (let i=0; i<Object.keys(this.state.places).length; i++) {
            placesFrontImageLink.push(this.state.places[i][image_links][0]);
        }
        
    }

    handleClick(i) {
    }

    renderPlace(i) {
        return (
            <Place  
                top={this.state.placesTop[i]}
                left={this.state.placesLeft[i]}
                frontImageLink={this.state.placesFrontImageLink[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
  
    render() {
        let htmlElements = [];
        for (item of Object.keys(this.state.places)) {
            htmlElements.push(this.renderPlace(item));
        }
        return 
    }
  }

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));


