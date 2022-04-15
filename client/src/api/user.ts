import axios from 'axios';
import type { ObjectId } from 'mongodb';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export type FavoriteHike = {
  userId: ObjectId;
  pathIds: ObjectId[];
  name: string;
};

export type hikeToRemove = {
  userId: ObjectId;
  hikeId: string;
};

export const getUser = () =>
  api
    .get('/user', {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getFavouriteHikes = (hikeIds: ObjectId[]) =>
  api
    .post(
      '/user/hikes',
      {
        data: hikeIds,
      },
      { withCredentials: true },
    )
    .then((res) => res.data);

export const addHikeToFavourites = (hike: FavoriteHike) =>
  api
    .post(
      '/user/hike/save',
      {
        user_id: hike.userId,
        hike_ids: hike.pathIds,
        nickname: hike.name,
      },
      { withCredentials: true },
    )
    .then((res) => res.data);

export const removeHikeFromFavorites = (data: hikeToRemove) =>
  api
    .delete('/user/hike/delete', {
      data: {
        user_id: data.userId,
        hike_id: data.hikeId,
      },
      withCredentials: true,
    })
    .then((res) => res.data);
