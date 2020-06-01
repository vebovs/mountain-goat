import axios from 'axios';

const API_URL = 'http://localhost:5000/';

class UserService {

    async getFavouriteHikes(user_id) {
        console.log(user_id);
    }

    async addHikeToFavourites(hike_id) {
        console.log(hike_id);
    }
}

export default new UserService();