import axios from 'axios';

const API_URL = 'http://localhost:5000/';

class HikesService {

    async findHikesWithinArea(points) {
        return await axios.post(API_URL + 'hikes', {
            top: points.top,
            bottom: points.bottom,
            left: points.left,
            right: points.right
        })
        .then(response => {
            return response.data;
        })
        .catch(error => console.log('Error: ' + error));
    }

}

export default new HikesService();