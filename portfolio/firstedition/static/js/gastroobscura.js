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
            const domContainer = document.querySelector('#like_button_container');
            const root = ReactDOM.createRoot(domContainer);
            root.render(e(PlaceSet));
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


function Place(props) {
    console.log("props: ", (String(props.left) + "px"))
    return ( 
        <img className="place" style={{"top": String(props.top) + "px", "left": String(props.left) + "px"}} src={props.frontImageLink} width="100px" />
    );
}

class PlaceSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: places,
            placesTop: [],
            placesLeft: [],
            placesFrontImageLink: [],
        };
        console.log("this.state.places: ", this.state.places)
        this.getPlacesData();
        console.log('placesTop: ', this.state.placesTop)
    }

    getPlacesData() {
        let cx = document.getElementsByClassName("mapouter")[0].getBoundingClientRect().left + 250;
        let cy = document.getElementsByClassName("mapouter")[0].getBoundingClientRect().top + 250;

        console.log('cx, cy: ', cx, cy)

        let numOfPlaces = Object.keys(this.state.places).length;
        let placesDegrees;
        if (numOfPlaces % 2 === 1) {
            placesDegrees = [180];
        } else {
            placesDegrees = [163, 133];
        }
        for (let i=0; i<(numOfPlaces-1)/2; i++) {
            placesDegrees.push(placesDegrees[placesDegrees.length-1] - 30)
            placesDegrees.unshift(placesDegrees[0] + 30)
        }


        let placesCentres = placesDegrees.map(item => [cx + 350*Math.cos(inRadians(item)), cy + 350*Math.sin(inRadians(item))]);

        

        this.state.placesLeft = placesCentres.map(item => item[0] - 50);
        this.state.placesTop = placesCentres.map(item => item[1] - 50);

        for (let i=0; i<Object.keys(this.state.places).length; i++) {
            console.log("this.state.places[i][image_links]: ", this.state.places[i]["image_links"][0])
            let a = this.state.places[i]["image_links"][0];
            console.log('this.placesFrontImageLink: ', this.placesFrontImageLink)
            this.state.placesFrontImageLink.push(a);
        }
        
    }

    handleClick(i) {
    }

    renderPlace(i) {
        console.log('i: ', i, this.state.placesTop[i])
        return (
            <Place  
                top={this.state.placesTop[i]}
                left={this.state.placesLeft[i]}
                frontImageLink={this.state.placesFrontImageLink[i]}
            />
        );
    }
  
    render() {
        let htmlElements = [];
        let item;
        for (item of Object.keys(this.state.places)) {
            htmlElements.push(this.renderPlace(item));
        }
        console.log(htmlElements)
        return htmlElements;
    }
  }




