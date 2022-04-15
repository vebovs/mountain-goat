import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = (username: string, password: string) =>
  api
    .post(
      '/register',
      {
        username: username,
        password: password,
      },
      { withCredentials: true },
    )
    .then((res) => res.data);

export const loginUser = (username: string, password: string) =>
  api
    .post(
      '/login',
      {
        username: username,
        password: password,
      },
      { withCredentials: true },
    )
    .then((res) => res.data);

export const logoutUser = () =>
  api.get('/logout', { withCredentials: true }).then((res) => res.data);
