import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

type Points = {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export const findHikesWithinArea = (points: Points) => 
    api.post('/hikes', {
        top: points.top,
        bottom: points.bottom,
        left: points.left,
        right: points.right
    }, { withCredentials: true }).then(res => res.data);

export const getHike = (id: string) => 
    api.get(`/hike/${id}`, { withCredentials: true }).then(res => res.data);