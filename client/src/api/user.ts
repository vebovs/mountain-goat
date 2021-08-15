import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getFavouriteHikes = (hikeIds: string[]) => 
    api.post('/user/hikes', {
        data: hikeIds
    }).then(res => res.data);

export const addHikeToFavourites = (userId: string, pathIds: string[], name: string) => 
    api.post('/user/hike/save', {
        user_id: userId,
        hike_ids: pathIds,
        nickname: name
    }).then(res => res.data);

export const removeHikeFromFavorites = (userId: string, hikeId: string) => 
    api.delete('/user/hike/delete', {
        data: {
            user_id: userId,
            hike_id: hikeId
        }
    }).then(res => res.data);