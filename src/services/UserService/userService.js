import axios from 'axios';

const API_URL = 'http://localhost:5000/';

class UserService {

    async getFavouriteHikes(hike_ids) {
        return await axios.post(API_URL + 'user/hikes', {
            data: hike_ids
        }).then(response => {
            return response.data
        }).catch(error => console.log(error));
    }

    async addHikeToFavourites(user_id, hike_id) {
        console.log('USER: ' + user_id);
        console.log('HIKE: ' + hike_id);

        return await axios.post(API_URL + 'user/hike/save', {
            user_id: user_id,
            hike_id: hike_id
        }).then(response => {
            return response.data;
        }).catch(error => console.log(error));
    }

    async removeHike(user_id, hike_id) {
        return await axios.delete(API_URL + 'user/hike/delete', {
                data: {
                    user_id: user_id,
                    hike_id: hike_id
                }
        }).then(response => {
            return response.data;
        }).catch(error => console.log(error));
    }
}

export default new UserService();