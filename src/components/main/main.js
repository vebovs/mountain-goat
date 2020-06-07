import React from 'react';
import L from 'leaflet';

// CSS
import 'leaflet/dist/leaflet.css';
import 'bulma/css/bulma.css';
import './main.css';

// Services
import HikesService from '../../services/HikesService/hikesService';
import AuthService from '../../services/AuthService/authService';
import UserService from '../../services/UserService/userService';

// Components
import Menu from '../Menu/menu';
import Authentication from '../Authentication/authentication';
import Dashboard from '../Dashboard/dashboard';
import { Profile, Close } from '../Buttons';
import Card from '../Card/card';
import Slider from '../Slider/slider';
import Alert from '../Alert/alert';

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
        this.alert = false;
        this.message = '';
    }

    async findHikes(points) {
        HikesService.findHikesWithinArea(points)
        .then(res => {
            this.hikes = res;
            this.drawHikes();
        })
        .catch(error => {
            this.displayAlert(error.response.data);
        });
    }

    displayPopup = (event) => {
        const path = event.target;

        const content = '<div class="container">' +
                            '<div class="field">' +
                                '<div class="control">' +
                                    '<input id="nickname" class="input is info" type="text" placeholder="Nickname"></input>' +
                                '</div>' +
                            '</div>' +
                            '<button id="favourite-btn" class="button">' +
                                '<span class="icon">' +
                                    '<i class="fa fa-heart"></i>' +
                                '</span>' +
                            '</button>' +
                        '</div>';

        path.bindPopup(content, {
            minWidth: 128
        }).openPopup(); //Places a popup on a path

        const button = L.DomUtil.get('favourite-btn');
        L.DomEvent.addListener(button, 'click', (e) => {
            const nickname = L.DomUtil.get('nickname').value;
            if(this.state.status && nickname) {
                this.saveHike(path.feature._id, nickname);
                path.closePopup();
            } else {
                if(!this.state.status) {
                    this.displayAlert('You need to be logged in for this action');
                } else {
                    this.displayAlert('A nickname is required');
                }
            }
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

        //if(this.geoJSONlayer) this.map.removeLayer(this.geoJSONlayer);

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

    register(username, password) {
        if(!username && !password) {
            this.displayAlert('A username and password is required');
        } else if(!username) {
            this.displayAlert('A username is required');
        } else if(!password) {
            this.displayAlert('A password is required');
        } else {
            AuthService.register(username, password)
            .catch(error => {
                this.displayAlert(error.response.data);
            });
        }
    }

    login(username, password) {
        if(!username && !password) {
            this.displayAlert('A username and password is required');
        } else if(!username) {
            this.displayAlert('A username is required');
        } else if(!password) {
            this.displayAlert('A password is required');
        } else {
            AuthService.login(username, password)
            .then(res => {
                this.setState({
                    user: res
                });
                const ids = this.state.user.favourites.map(e => e.id);
                UserService.getFavouriteHikes(ids)
                .then(res => {
                    this.setState({
                        status: true,
                        favourites: res
                    });
                })
                .catch(error => {
                    this.displayAlert(error.response.data);
                });
            })
            .catch(error => {
                this.displayAlert(error.response.data);
            });
        }
    }

    logout() {
        AuthService.logout()
        .then(() => {
            this.setState({
                user: '',
                status: false
            });
        })
        .catch(error => {
            this.displayAlert(error.response.data);
        });
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

        const hikeId = hike.map(e => e._id)[0];
        this.state.userHikes.push({
            id: hikeId,
            layer: hikeLayer
        });

        const moveToCords = hike[0].geometry.coordinates[0];
        this.map.setView(moveToCords);
    }

    saveHike(id, nickname) {
        UserService.addHikeToFavourites(this.state.user._id, id, nickname)
        .then(() => {
            HikesService.getHike(id)
            .then(data => {
                this.state.user.favourites.push({
                    id: id,
                    nickname: nickname
                });
                this.state.favourites.push(data);
                this.setState(state => ({
                    favourites: state.favourites
                }));
            })
            .catch(error => {
                this.displayAlert(error.response.data);
            })
        })
        .catch(error => {
            this.displayAlert(error.response.data);
        });
    }

    clearHike = (id) => {
        const hikeToRemove = this.state.userHikes.filter(e => e.id === id);
        if(hikeToRemove.length) {
            const layerToRemove = hikeToRemove.map(e => e.layer)[0];
            this.map.removeLayer(layerToRemove);
            this.setState(state => {
                state.userHikes = state.userHikes.filter(e => e.id !== id);
            })
        }
    }

    removeHike(id) {
        this.clearHike(id);
        const favourite = this.state.user.favourites.filter(e => e.id === id)[0];
        const favourites = this.state.favourites.filter(e => e._id !== favourite.id);
        UserService.removeHike(this.state.user._id, id)
        .then(() => {
            const user = {...this.state.user};
            user.favourites = this.state.user.favourites.filter(e => e.id !== id);
            this.setState({
                user,
                favourites
            });
        })
        .catch(error => {
            this.displayAlert(error.response.data);
        });
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

    displayAlert = (message) => {
        this.alert = true;
        this.message = message;
        this.setState({ state: this.state});
    }

    dismiss = () => {
        this.alert = false;
        this.message = '';
        this.setState({ state: this.state });
    }
 
    render() {
        return (
            <div id="container">
                <Alert alert={this.alert} onClick={this.dismiss}>{this.message}</Alert>
                <Menu title='Mountain Goat' openbtn={Profile} closebtn={Close}>
                    {
                        !this.state.status && <Authentication onLoginInput={this.login.bind(this)} onRegisterInput={this.register.bind(this)}/>
                    }
                    {
                        this.state.status && <div>
                            <Dashboard onClick={this.logout.bind(this)}>
                                <div>
                                    {
                                        this.state.user.favourites.map((e) => 
                                            <Card key={e.id} name={e.nickname} show={() => this.showHike(e.id)} remove={() => this.removeHike(e.id)} clear={() => this.clearHike(e.id)} />
                                        )
                                    }
                                </div>
                             </Dashboard>
                         </div>
                    }
                </Menu>
                <Slider toggle={this.toggle} onRangeInput={this.update.bind(this)} remove={this.remove} enter={this.enter} />
                <div id="map" onDoubleClick={this.select} ></div>
            </div>
        );
    }
}
