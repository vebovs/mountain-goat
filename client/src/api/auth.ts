import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const registerUser = (username: string, password: string) => 
    api.post('/register', {
        username: username,
        password: password
    }).then(res => res.data);

export const loginUser = (username: string, password: string) => 
    api.post('/login', {
        username: username,
        password: password
    }).then(res => res.data);

export const logoutUser = () => 
    api.get('/logout').then(res => res.data);