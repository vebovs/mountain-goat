import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Fade from 'react-reveal/Fade';
import Button from 'react-bootstrap/Button';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Toggle } from '../toggle/toggle';

//Default map starting point, OSLO
let center = [59.911491, 10.757933];

export class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            value: 3
        };
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
        this.popups = new Array(this.hikes.length);
        for(let i = 0; i < this.hikes.length; i++){
            this.popups[i] = L.popup().setLatLng([this.hikes[i].lat, this.hikes[i].lng]).setContent('<p>Hike</p>').addTo(this.map);
        }
    }


    enter = () => {
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
        //The marker is off from the selected position for some unknown reason
        let event = this.map.mouseEventToLatLng(e);
        if(!this.circle){
            this.circle = L.circle([event.lat, event.lng], {radius: (this.state.value *1000)}).addTo(this.map);
            //Should find a better way of opening the distance slider
            document.getElementById('hiddenbtn').click();
        } else {
            this.map.removeLayer(this.circle);
            this.circle = L.circle([event.lat, event.lng], {radius: (this.state.value *1000)}).addTo(this.map);
        }
        this.setState({ state: this.state });
    }

    remove = () => {
        this.map.removeLayer(this.circle);

        if(this.popups){
            for(let i = 0; i < this.popups.length; i++){
                this.map.removeLayer(this.popups[i]);
            }
        }

        this.circle = undefined;
        this.popups = undefined;
        this.hikes  = undefined;

        //Should find a better way of closing the distance slider
        document.getElementById('hiddenbtn').click();
        this.setState({ state: this.state });
    }

    update = (value) => {
        this.setState({ value });
        this.circle.setRadius(value *1000);
    }
 
    componentDidMount(){
        this.map = L.map('map', {
            center: center,
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
                <Toggle>
                    {({ on, toggle }) => (
                            <div>
                                <button id="hiddenbtn" onClick={toggle}>Show/Hide</button>
                                {on && <Fade bottom>
                                    <div id="slider">
                                    <Button id="enterbtn" variant="success" onClick={this.enter}>Enter</Button>
                                    <Button id="closebtn" variant="danger" onClick={this.remove}>Close</Button>
                                        <div id="distance">{ 'Avstand: ' + this.state.value + ' km' }</div>
                                        <InputRange
                                            axis="x"
                                            xstep={1}
                                            maxValue={20}
                                            minValue={1}
                                            value={this.state.value}
                                            onChange={value => this.update(value)}
                                        />
                                    </div>
                                </Fade>}
                            </div>
                        )}
                </Toggle>
            </div>
        );
    }
}
