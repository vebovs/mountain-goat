import axios from 'axios';
import type { ObjectId } from 'mongodb';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export type FavoriteHike = {
    userId: ObjectId; 
    pathIds: ObjectId[]; 
    name: string;
}

export const getFavouriteHikes = (hikeIds: string[]) => 
    api.post('/user/hikes', {
        data: hikeIds
    }).then(res => res.data);

export const addHikeToFavourites = (hike: FavoriteHike) => 
    api.post('/user/hike/save', {
        user_id: hike.userId,
        hike_ids: hike.pathIds,
        nickname: hike.name
    }).then(res => res.data);

export const removeHikeFromFavorites = (userId: string, hikeId: string) => 
    api.delete('/user/hike/delete', {
        data: {
            user_id: userId,
            hike_id: hikeId
        }
    }).then(res => res.data);