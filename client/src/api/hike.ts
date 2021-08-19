import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
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
    }).then(res => res.data);

export const getHike = (id: string) => 
    api.get(`/hike/${id}`).then(res => res.data);