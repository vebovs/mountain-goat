import axios from 'axios';

const API_URL = 'http://localhost:5000/';

class AuthService {

    async register(username, password) {
        return await axios.post(API_URL + 'register', {
            username: username,
            password: password
        });
    }

    async login(username, password) {
        return await axios.post(API_URL + 'login', {
            username: username,
            password: password
        }).then(response => {
            return response.data;
        });
    }

    async logout() {
        return await axios.get(API_URL + 'logout')
            .then(response => {
                return response;
            });
    }

}

export default new AuthService();