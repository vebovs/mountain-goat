import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Fade from 'react-reveal/Fade';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import 'bulma/css/bulma.css';

import Menu from '../Menu/menu';
import Auth from '../Auth/auth'
import { Profile, Close } from '../Buttons';

export class Main extends React.Component {
    constructor() {
        super();
        this.state = { 
            value: 3
        };
        //Default map starting point, OSLO
        this.center = [59.911491, 10.757933];
        this.toggle = false;
        this.onAlert = false;
    }

    async transport(points) {
        await axios.post('http://localhost:5000/hikes', {
            top: points.top,
            bottom: points.bottom,
            left: points.left,
            right: points.right
        })
        .then(response => {
            this.hikes = response.data
            console.log(this.hikes);
        })
        .catch(error => console.log('Error: ' + error));

        this.setState({ state: this.state });
        this.display();
    }

    //Draws the hikes on the map
    display = () => {
        this.geoJSONlayer = L.geoJSON(this.hikes, {
            style: (feature) => {
                return {
                    stroke: true,
                    color: 'grey',
                    weight: 5,
                    opacity: 0.75
                };
            },
            coordsToLatLng: (coords) => {
                return new L.LatLng(coords[0], coords[1]); //Reverse the coordinates to suit leaflet drawing
            }
        }).addTo(this.map);

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

        //Removes the circle and traced hikes from the map
        this.map.removeLayer(this.circle);
        if(this.geoJSONlayer) this.map.removeLayer(this.geoJSONlayer);

        this.geoJSONlayer = undefined;
        this.circle = undefined;
        this.hikes  = undefined;

        this.setState({ state: this.state });
    }

    update = (value) => {
        //Updates the slider value and the circle radius
        this.setState({ value });
        this.circle.setRadius(value *1000);
    }
 
    componentDidMount() {
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

    auth = (username, password) => {
        console.log('Username: ' + username + ', Password: ' + password);
    }

    render() {
        return (
            <div id="container">
                <Menu title='Mountain Goat' openbtn={Profile} closebtn={Close}>
                    <Auth onAuthenticateInput={this.auth}/>
                </Menu>
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
