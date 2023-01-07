let latitude;
let longitude;
let address = $("main").attr("data-url");
let places = {}
let map;

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
  }
}

function assignGeoValues(position) {
    latitude = position.coords.latitude; 
    longitude = position.coords.longitude;
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
            const currentLocation = { lat: latitude, lng: longitude };
            map = new google.maps.Map(document.getElementById("gmap_canvas"), {zoom: 5, center: currentLocation});
            
            places = response; 
            for (let i=0; i<Object.keys(places).length; i++) {
                const placeLocation = { lat: places[i]["latitude"], lng: places[i]["longitude"] };
                const marker = new google.maps.Marker({ position: placeLocation, map: map });
            }

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

function Clipping(props) {
    return ( 
        <div id={props.id} className="place-info" style={{"clipPath": props.clippingShape, "background": props.color}}>
            {props.title}
            <p>{props.address}</p>
            <div className="gallery">
                {props.images}
            </div>
        </div>
    );
}

function Place(props) {
    return ( 
        <img id={props.id} className="place" style={{"top": String(props.top) + "px", "left": String(props.left) + "px"}} src={props.frontImageLink} width="14vh" onClick={props.onClick}/>
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
            placesColor: ["#E5E4E2", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080"],
            clicked: Array(5).fill(0)
        };
        this.getPlacesData();
    }

    getPlacesData() {
        let cx = document.getElementsByClassName("mapouter")[0].getBoundingClientRect().left + document.documentElement.clientHeight * 0.35;
        let cy = document.getElementsByClassName("mapouter")[0].getBoundingClientRect().top + document.documentElement.clientHeight * 0.35;

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

        let rPx = document.documentElement.clientHeight * 0.45;

        let placesCentres = placesDegrees.map(item => [cx + rPx*Math.cos(inRadians(item)), cy + rPx*Math.sin(inRadians(item))]);

        let cPx = document.documentElement.clientHeight * 0.07;

        this.state.placesLeft = placesCentres.map(item => item[0] - cPx);
        this.state.placesTop = placesCentres.map(item => item[1] - cPx);

        for (let i=0; i<Object.keys(this.state.places).length; i++) {
            let a = this.state.places[i]["image_links"][0];
            this.state.placesFrontImageLink.push(a);
        }
        
    }

    handleClick(i) {
        let cPx = document.documentElement.clientHeight * 0.07;
        let clippingTop = String(this.state.placesTop[i] + cPx) + "px";
        let clippingLeft = String(this.state.placesLeft[i] + cPx) + "px";
        document.documentElement.style.setProperty('--clipping-left', clippingLeft);
        document.documentElement.style.setProperty('--clipping-top', clippingTop);
        map.setCenter({lng: this.state.places[i]["longitude"], lat: this.state.places[i]["latitude"]});
        map.setZoom(10);

        if (this.state.clicked.every(item => item === 0)) {
            document.getElementById(`place-${i}-info`).style.animation = "peek 5s forwards"
            document.getElementById(`place-${i}-info`).style.clipPath = `circle(200% at ${clippingLeft} ${clippingTop})`
            this.state.clicked[i] = 1;
        } else if (this.state.clicked.some(item => item === 1)) {
            if (this.state.clicked[i] === 1) {
                document.getElementById(`place-${i}-info`).style.animation = "close 1s forwards";
                document.getElementById(`place-${i}-info`).style.clipPath = `circle(7vh at ${clippingLeft} ${clippingTop})`
                this.state.clicked[i] = 0;
            } else {
                document.getElementById(`place-${i}-info`).style.animation = "peek 5s forwards"

                let j = this.state.clicked.indexOf(1);
                let clippingTopJ = String(this.state.placesTop[j] + cPx) + "px";
                let clippingLeftJ = String(this.state.placesLeft[j] + cPx) + "px";
                document.getElementById(`place-${j}-info`).style.animation = ""; 
                document.getElementById(`place-${j}-info`).style.clipPath = `circle(7vh at ${clippingLeftJ} ${clippingTopJ})`;               
                this.state.clicked[j] = 0;

                
                this.state.clicked[i] = 1;
            }
        }
    }

    renderPlace(i) {
        return (
            <Place  
                id={`place-${i}`}
                top={this.state.placesTop[i]}
                left={this.state.placesLeft[i]}
                frontImageLink={this.state.placesFrontImageLink[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    renderClipping(i) {
        let cPx = document.documentElement.clientHeight * 0.07;
        let clippingTop = String(this.state.placesTop[i] + cPx) + "px";
        let clippingLeft = String(this.state.placesLeft[i] + cPx) + "px";
        let galleryImages = [];
        for (let k=0; k<this.state.places[i].image_links.length; k++) {
            galleryImages.push(<img className="gallery-image" src={this.state.places[i].image_links[k]}/>)
        }
        return (
            <Clipping  
                images={galleryImages}
                title={<a href={this.state.places[i]["link"]} target="_blank"><h1>{this.state.places[i]["title"] + "   "}<i className="fa fa-external-link" style={{"fontSize":"24px", "color":"#454541"}}></i></h1></a>}
                address={this.state.places[i]["address"].join(" | ")}
                id={`place-${i}-info`}
                color={`radial-gradient(circle at ${clippingLeft} ${clippingTop}, #C0C0C0 0%, white 15%)`}
                clippingShape={`circle(7vh at ${clippingLeft} ${clippingTop})`}
            />
        );
    }
  
    render() {
        let htmlElements = [];
        let item;
        for (item of Object.keys(this.state.places)) {
            htmlElements.push(this.renderPlace(item));
            htmlElements.push(this.renderClipping(item));
        }
        return htmlElements;
    }
  }

addEventListener("resize", (event) => {
    let cx = document.getElementsByClassName("mapouter")[0].getBoundingClientRect().left + document.documentElement.clientHeight * 0.35;
    let cy = document.getElementsByClassName("mapouter")[0].getBoundingClientRect().top + document.documentElement.clientHeight * 0.35;

    let numOfPlaces = Object.keys(places).length;
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

    let rPx = document.documentElement.clientHeight * 0.45;

    let placesCentres = placesDegrees.map(item => [cx + rPx*Math.cos(inRadians(item)), cy + rPx*Math.sin(inRadians(item))]);

    let cPx = document.documentElement.clientHeight * 0.07;

    let newPlacesLefts = placesCentres.map(item => item[0] - cPx);
    let newPlacesTops = placesCentres.map(item => item[1] - cPx);

    for (let i=0; i<Object.keys(places).length; i++) {
        $(`#place-${i}`).attr("style", `top: ${newPlacesTops[i]}px; left: ${newPlacesLefts[i]}px;`);
        let newClippingTop = String(newPlacesTops[i] + cPx) + "px";
        let newClippingLeft = String(newPlacesLefts[i] + cPx) + "px";
        $(`#place-${i}-info`).attr("style", `clip-path: circle(7vh at ${newClippingLeft} ${newClippingTop}); background: radial-gradient(circle at ${newClippingLeft} ${newClippingTop}, rgb(192, 192, 192) 0%, white 15%);`);
    }
});


