import React from 'react';
import L from 'leaflet';

// CSS
import 'leaflet/dist/leaflet.css';
import 'font-awesome/css/font-awesome.css';
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
import Card from '../Card/card';
import Slider from '../Slider/slider';
import Alert from '../Alert/alert';
import Dropdown from '../Dropdown/dropdown';

delete L.Icon.Default.prototype._getIconUrl; //Removes markers from being drawn

export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '', //User data
            userHikes: [], //Favourite hikes layers
            favourites: '', //Favourite hikes with all the data
            value: 3,
            status: false //Authenticated status
        };
        //Default map starting point, OSLO
        //this.center = [59.911491, 10.757933];
        this.center = [59.861023, 5.782079]; //Husnes
        this.toggle = false; //Toggles the slider
        this.alert = false; //Toggles the alert
        this.message = ''; //Alert message displayed 
        this.loading = false; //Displays when gathering hikes from area
        this.success = false; //Registration status
        this.popup = false; //To check if a popup is being drawn to stop a circle from overlapping
    }

    // Finds all the hikes within a given area and draws them on the map
    findAndDrawHikes(points) {
        this.loading = true;
        this.setState({ state: this.state });

        HikesService.findHikesWithinArea(points)
        .then(res => {
            if(!res.length) {
                this.displayAlert('No hikes found'); //Let the user know if nothing was found
            } else {
                this.hikes = res;
                //Draws all the hikes found
                this.geoJSONlayer = L.geoJSON(this.hikes, {
                    style: (feature) => {
                        return {
                            stroke: true,
                            color: '#3273DC',
                            weight: 10,
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

                this.map.removeLayer(this.circle);
                this.loading = false;
                this.setState({ state: this.state });
            }
        })
        .catch(error => {
            this.displayAlert(error.response.data);
        });
    }

    // Adds all the contents and events to the popups
    displayPopup = (event) => {
        this.popup = true;
        const path = event.target; //The specific hike the user clicked on

        //The content to be placed in a popup
        const content = '<div class="container">' +
                            '<div class="field">' +
                                '<div class="control">' +
                                    '<input id="nickname" class="input is info" type="text" placeholder="Nickname"></input>' +
                                '</div>' +
                            '</div>' +
                            '<button id="favourite-btn" class="button">' +
                                '<span class="icon">' +
                                    '<i class="fa fa-map"></i>' +
                                '</span>' +
                            '</button>' +
                        '</div>';

        path.bindPopup(content, {
            minWidth: 128
        }).openPopup(); //Places the popup on the path the user clicked on

        //Allow circle to be drawn again
        path.getPopup().on('remove', () => {
            setTimeout(() => {
                this.popup = false;
            }, 100);
        });

        /*
            Check to see if the user is currently logged in and has given the hike to favourite a nickname.
            If not then flash the relevant errors.
        */
        const button = L.DomUtil.get('favourite-btn');
        L.DomEvent.addListener(button, 'click', () => {
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

    // Stores the boundries of the circle in an object used to find hikes within said boundries
    searchForHikes = () => {
        //Remove existing traced hikes before drawing new ones
        if(this.geoJSONlayer) this.map.removeLayer(this.geoJSONlayer);
        
        //Gets the edgepoints of the circle
        const points = this.circle.getBounds();

        //Storing the boundries in a more accessible and readable manner
        const data = {
            top: points._northEast.lat,
            bottom: points._southWest.lat,
            left: points._southWest.lng,
            right: points._northEast.lng
        }

        this.findAndDrawHikes(data);
    }

    // Places a circle around the point the user clicked
    selectPoint = (e) => {

        if(!this.popup && !this.pathing) {
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
    }

    // Removes the circle and any general hikes currently drawn on the map
    removeCircleAndHikes = () => {
        this.toggle = false;

        //Removes the circle and traced hikes from the map
        this.map.removeLayer(this.circle);
        if(this.geoJSONlayer) this.map.removeLayer(this.geoJSONlayer);

        this.geoJSONlayer = '';
        this.circle = '';
        this.hikes  = '';

        this.setState({ state: this.state });
    }

    // Updates the circle size when slider values changes
    updateCircle = (value) => {
        this.setState({ value });
        this.circle.setRadius(value *1000); // Convert to kilometers
    }

    // Registers a user
    register(username, password) {
        
        //Reset the success mark on consecutive registration
        if(this.success) {
            this.success = false;
            this.setState({ state: this.state });
        }

        if(!username && !password) {
            this.displayAlert('A username and password is required');
        } else if(!username) {
            this.displayAlert('A username is required');
        } else if(!password) {
            this.displayAlert('A password is required');
        } else {
            AuthService.register(username, password)
            .then(() => {
                this.success = true;
                this.setState({ state: this.state });
            })
            .catch(error => {
                this.displayAlert(error.response.data);
            });
        }
    }

    // Logs a user in
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
                const ids = this.state.user.favourites.map(e => e.id); //Gets all the ids from the user's favourtie hikes. Used to get all the specific data about the hikes.
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

    // Logs a user out
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

    // Draws a specific favourited hike when the user clicks on it from their panel
    showHike = (id) => {
        this.toggle = false; //Close menu before displaying selected hike
        this.setState({ state: this.state });
        const hike = this.state.favourites.filter(e => e._id === id);
        const hikeLayer = L.geoJSON(hike, {
            style: (feature) => {
                return {
                    stroke: true,
                    color: '#3273DC',
                    weight: 10,
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

        //Adds the id and layer to an array for easy clearing later
        const hikeId = hike.map(e => e._id)[0];
        this.state.userHikes.push({
            id: hikeId,
            layer: hikeLayer
        });

        //Move the view to the hike the user clicked on
        const moveToCords = hike[0].geometry.coordinates[0];
        this.map.setView(moveToCords);
    }

    // Lets the user favourite a hike with a custom nickname
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

    // Clears a drawn hike in the favourites from the map
    clearHike = (id) => {
        const hikeToRemove = this.state.userHikes.filter(e => e.id === id); //The hike to clear found from the id
        if(hikeToRemove.length) {
            const layerToRemove = hikeToRemove.map(e => e.layer)[0]; //Gets the layer
            this.map.removeLayer(layerToRemove); //Clears the hike
            this.setState(state => {
                state.userHikes = state.userHikes.filter(e => e.id !== id);
            })
        }
    }

    // Deletes a hike from the user's favourties
    removeHike(id) {
        this.clearHike(id);
        const favourite = this.state.user.favourites.filter(e => e.id === id)[0]; //Gets the hike to remove
        const favourites = this.state.favourites.filter(e => e._id !== favourite.id); //Removes the hike from the local favourites
        //If removal is successful the current state is updated with the hike removed
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

    // Flashes an error message to the user
    displayAlert = (message) => {
        this.alert = true;
        this.message = message;
        this.setState({ state: this.state});
    }

    // Closes the error message
    dismissAlert = () => {
        this.alert = false;
        this.message = '';
        this.setState({ state: this.state });
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

        let mouseisdown = false;
        const map = document.getElementById('map');

        // Differentiating between clicking on the map and holding to move the view of the map
        map.addEventListener('mousedown', (e) => {
            mouseisdown = true;
            setTimeout(() => {
                if(!mouseisdown) {
                    this.selectPoint(e);
                }
            }, 100);
        });

        map.addEventListener('mouseup', () => {
            mouseisdown = false;
        });
    }
 
    render() {
        return (
            <div id="app-container">
                <Dropdown/>
                <Alert alert={this.alert} onClick={this.dismissAlert}>{this.message}</Alert>
                <Menu title='Mountain Goat'>
                    {
                        !this.state.status && <Authentication success={this.success} onLoginInput={this.login.bind(this)} onRegisterInput={this.register.bind(this)}/>
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
                <Slider loading={this.loading} toggle={this.toggle} onRangeInput={this.updateCircle.bind(this)} exit={this.removeCircleAndHikes} enter={this.searchForHikes} />
                <div id="map" />
            </div>
        );
    }
}
