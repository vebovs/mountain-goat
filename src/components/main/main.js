import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Fade from 'react-reveal/Fade';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export class Main extends React.Component {
    constructor(){
        super();
        this.state = { 
            value: 3
        };
        //Default map starting point, OSLO
        this.center = [59.911491, 10.757933];
        this.toggle = false;
        this.onAlert = false;
    }

    async transport(points){
        await fetch('http://localhost:8080/api', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                    'top': points.top,
                    'bottom': points.bottom,
                    'left': points.left,
                    'right': points.right
                })
              })
              .then(res => res.json())
              .then(data => {
                  this.hikes = data;
              })
              .catch(error => console.error("Error " + error));
        console.log(this.hikes);
        this.setState({ state: this.state });
        this.display();
    }

    display = () => {
        //If no hikes are returned the user gets a popup letting them know
        if(!this.hikes.length) {
            console.log(this.hikes.length);
            this.onAlert = true;
        }

        //Goes through the popup array and displays each popup on the map
        this.popups = new Array(this.hikes.length);
        for(let i = 0; i < this.hikes.length; i++){
            this.popups[i] = L.popup().setLatLng([this.hikes[i].lat, this.hikes[i].lng]).setContent('<p>Hike</p>').addTo(this.map);
        }

        this.setState({ state: this.state});
    }


    enter = () => {
        //Gets the edgepoints of the circle
        let points = this.circle.getBounds();

        let data = {
            top: points._northEast.lat,
            bottom: points._southWest.lat,
            left: points._southWest.lng,
            right: points._northEast.lng
        }

        this.transport(data);
    }

    select = (e) => {
        this.toggle = true;

        //Converts the (x,y) coordinates of the window to latitude and longitude
        let event = this.map.mouseEventToLatLng(e);

        //Checks to see if there already is a circle on the map. If there is, it is replaced with a new one.
        if(!this.circle){
            this.circle = L.circle([event.lat, event.lng], {radius: (this.state.value *1000)}).addTo(this.map);
        } else {
            this.map.removeLayer(this.circle);
            this.circle = L.circle([event.lat, event.lng], {radius: (this.state.value *1000)}).addTo(this.map);
        }
        this.setState({ state: this.state });
    }

    remove = () => {
        this.toggle = false;
        this.onAlert = false;

        //Removes the circle from the map
        this.map.removeLayer(this.circle);

        //Loop through the popup array and removes them
        if(this.popups){
            for(let i = 0; i < this.popups.length; i++){
                this.map.removeLayer(this.popups[i]);
            }
        }

        this.circle = undefined;
        this.popups = undefined;
        this.hikes  = undefined;

        this.setState({ state: this.state });
    }

    update = (value) => {
        //Updates the slider value and the circle radius for a responsive user experience
        this.setState({ value });
        this.circle.setRadius(value *1000);
    }
 
    componentDidMount(){
        this.map = L.map('map', {
            center: this.center,
            zoom: 8
        });
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
            detectRetina: true,    
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map);
    }

    render(){
        return (
            <div id="container">
                <div id="map" onClick={this.select}></div>
                {this.onAlert && <Alert id="alert" variant="danger">
                    <Alert.Heading>No hikes found</Alert.Heading>
                </Alert>}
                {this.toggle && <Fade bottom>
                    <div id="popup">
                        <Button id="enterbtn" variant="success" onClick={this.enter}>Enter</Button>
                        <Button id="closebtn" variant="danger" onClick={this.remove}>Close</Button>
                            <div id="distance">{ 'Distance: ' + this.state.value + ' kilometer(s)' }</div>
                            <div id="slider">
                                <InputRange
                                    axis="x"
                                    xstep={1}
                                    maxValue={20}
                                    minValue={1}
                                    value={this.state.value}
                                    onChange={value => this.update(value)}
                                />
                        </div>
                    </div>
                </Fade>}
            </div>
        );
    }
}
