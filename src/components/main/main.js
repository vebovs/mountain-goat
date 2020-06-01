import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Fade from 'react-reveal/Fade';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bulma/css/bulma.css';

// Services
import HikesService from '../../services/HikesService/hikesService';
import AuthService from '../../services/AuthService/authService';
import UserService from '../../services/UserService/userService';

// Components
import Menu from '../Menu/menu';
import AuthForm from '../AuthForm/authForm'
import { Profile, Close } from '../Buttons';
import Card from '../Card/card';

export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '', 
            userHikes: [],
            favourites: '',
            value: 3,
            status: false
        };
        //Default map starting point, OSLO
        //this.center = [59.911491, 10.757933];
        this.center = [59.861023, 5.782079]; //Husnes
        this.toggle = false;
        this.onAlert = false;
    }

    async findHikes(points) {
        this.hikes = await HikesService.findHikesWithinArea(points);
        //this.setState({ state: this.state });
        this.drawHikes(); // Seperate function needed?
    }

    displayPopup = (event) => {
        const path = event.target;
        const content = '<button id="favourite-btn" class="button">\
                            <span class="icon">\
                            <i class="fa fa-heart"></i>\
                            </span>\
                            </button>';

        path.bindPopup(content).openPopup(); //Places a popup on a path

        const button = L.DomUtil.get('favourite-btn');
        L.DomEvent.addListener(button, 'click', (e) => {
            this.saveHike(path.feature._id);
            path.closePopup();
        });
    }

    //Draws the hikes on the map
    drawHikes = () => {
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
            },
            onEachFeature: (feature, layer) => {
                layer.on('click', this.displayPopup);
            }
        }).addTo(this.map);
        //this.setState({ state: this.state});
    }


    enter = () => {

        //Remove existing traced hikes before drawing new ones
        if(this.geoJSONlayer) this.map.removeLayer(this.geoJSONlayer);
        
        //Gets the edgepoints of the circle
        let points = this.circle.getBounds();

        let data = {
            top: points._northEast.lat,
            bottom: points._southWest.lat,
            left: points._southWest.lng,
            right: points._northEast.lng
        }

        this.findHikes(data);
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

    async register(username, password) {
        const res = await AuthService.register(username, password);
        if(res) console.log(res);
    }

    async login(username, password) {
        const res = await AuthService.login(username, password);
        if(res) {
            this.state.user = res;
            this.state.favourites = await UserService.getFavouriteHikes(this.state.user.favourites);
            this.setState(() => ({
                status: true
            }));
        }
    }

    async logout() {
        const res = await AuthService.logout();
        if(res) {
            this.state.user = undefined;
            this.setState(() => ({
                status: false
            }));
        }
    }

    showHike = (id) => {
        const hike = this.state.favourites.filter(e => e._id === id);
        //this.drawHikes(hike);

        const hikeLayer = L.geoJSON(hike, {
            style: (feature) => {
                return {
                    stroke: true,
                    color: 'grey',
                    weight: 5,
                    opacity: 0.75
                };
            },
            coordsToLatLng: (coords) => {
                return new L.LatLng(coords[0], coords[1]);
            },
            onEachFeature: (feature, layer) => {
                layer.on('click', this.displayPopup);
            }
        }).addTo(this.map);

        this.state.userHikes.push([hikeLayer, hike]);

        const moveToCords = hike[0].geometry.coordinates[0];
        this.map.setView(moveToCords);
    }

    async saveHike(id) {
        if(this.state.status) {
            const res = await UserService.addHikeToFavourites(this.state.user._id, id);
            if(res) {
                const data = await HikesService.getHike(id);
                this.state.favourites.push(data);
                if(data) {
                    this.setState(state => ({
                        favourites: state.favourites
                    }));
                }
            }
        } else {
            alert('You need to be logged in for this action');
        }
    }

    clearHike = (id) => {
        if(this.state.userHikes.length > 0) {
            const hikeToRemove = this.state.userHikes.filter(e => e[1][0]._id === id)[0][0];
            this.map.removeLayer(hikeToRemove);
        }
        
    }

    async removeHike(id) {
        this.clearHike(id);
        const favouriteId = this.state.user.favourites.filter(e => e === id)[0];
        const favourites = this.state.favourites.filter(e => e._id !== favouriteId);
        const res = await UserService.removeHike(this.state.user._id, id);
        if(res) {
            this.setState({
                favourites: favourites
            });
        }
    }

    componentDidMount() {
        this.map = L.map('map', {
            center: this.center,
            zoom: 14 // Starting zoom value
        });

        //zoom: 5

        this.map.doubleClickZoom.disable(); // Disables zoom when double clicking
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
            detectRetina: true,    
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map);

        this.login('test', 'test');
    }

    render() {
        return (
            <div id="container">
                <Menu title='Mountain Goat' openbtn={Profile} closebtn={Close}>
                    {
                        !this.state.status && <AuthForm onLoginInput={this.login.bind(this)} onRegisterInput={this.register.bind(this)}/>
                    }
                    {
                        this.state.status && <div className="container">

                            <div>
                                {
                                    this.state.favourites.map((e) => 
                                        <Card key={e._id} name={e._id} show={() => this.showHike(e._id)} remove={() => this.removeHike(e._id)} clear={() => this.clearHike(e._id)}/>
                                    )
                                }
                            </div>

                            <div className='field'>
                                <p className='control'>
                                <button onClick={this.logout.bind(this)} className='button is-info is-outlined'>
                                    Logout
                                </button>
                                </p>
                            </div>

                            
                         </div>
                    }
                </Menu>
                <div id="map" onDoubleClick={this.select} ></div>
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
