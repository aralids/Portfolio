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
            console.log("circle1: ", document.getElementsByClassName("mapouter")[0].getBoundingClientRect().left + 250)
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
    console.log("props: ", props)
    return ( 
        <div id={props.id} className="place-info" style={{"clipPath": props.clippingShape, "backgroundColor": props.color}}>
            {props.title}
            <p>{props.address}</p>
            <div className="gallery">
                {props.images}
            </div>
        </div>
    );
}

function Place(props) {
    console.log("props: ", props)
    return ( 
        <img id={props.id} className="place" style={{"top": String(props.top) + "px", "left": String(props.left) + "px"}} src={props.frontImageLink} width="100px" onClick={props.onClick}/>
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
        let clippingTop = String(this.state.placesTop[i] + 50) + "px";
        let clippingLeft = String(this.state.placesLeft[i] + 50) + "px";
        document.documentElement.style.setProperty('--clipping-left', clippingLeft);
        document.documentElement.style.setProperty('--clipping-top', clippingTop);
        console.log("Clicked: ", i)

        if (this.state.clicked.every(item => item === 0)) {
            document.getElementById(`place-${i}-info`).style.animation = "peek 5s forwards"
            document.getElementById(`place-${i}-info`).style.clipPath = `circle(200% at ${clippingLeft} ${clippingTop})`
            this.state.clicked[i] = 1;
            console.log("case 1")
        } else if (this.state.clicked.some(item => item === 1)) {
            if (this.state.clicked[i] === 1) {
                document.getElementById(`place-${i}-info`).style.animation = "close 1s forwards";
                document.getElementById(`place-${i}-info`).style.clipPath = `circle(50px at ${clippingLeft} ${clippingTop})`
                this.state.clicked[i] = 0;
                console.log("case 2")
            } else {
                document.getElementById(`place-${i}-info`).style.animation = "peek 5s forwards"

                let j = this.state.clicked.indexOf(1);
                console.log("j: ", j)
                let clippingTopJ = String(this.state.placesTop[j] + 50) + "px";
                let clippingLeftJ = String(this.state.placesLeft[j] + 50) + "px";
                document.getElementById(`place-${j}-info`).style.animation = ""; 
                document.getElementById(`place-${j}-info`).style.clipPath = `circle(50px at ${clippingLeftJ} ${clippingTopJ})`;               
                this.state.clicked[j] = 0;

                
                this.state.clicked[i] = 1;
                console.log("case 3")
            }
        }
    }

    renderPlace(i) {
        console.log('i: ', i, this.state.placesTop[i])
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
        let clippingTop = String(this.state.placesTop[i] + 50) + "px";
        let clippingLeft = String(this.state.placesLeft[i] + 50) + "px";
        let galleryImages = [];
        for (let k=0; k<this.state.places[i].image_links.length; k++) {
            galleryImages.push(<img className="gallery-image" src={this.state.places[i].image_links[k]}/>)
        }
        return (
            <Clipping  
                images={galleryImages}
                title={<a href={this.state.places[i]["link"]} target="_blank"><h1>{this.state.places[i]["title"] + "   "}<i class="fa fa-external-link" style={{"fontSize":"24px", "color":"white"}}></i></h1></a>}
                address={this.state.places[i]["address"].join(" | ")}
                id={`place-${i}-info`}
                color={this.state.placesColor[i]}
                clippingShape={`circle(50px at ${clippingLeft} ${clippingTop})`}
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
        console.log(htmlElements)
        return htmlElements;
    }
  }




