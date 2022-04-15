import type { ObjectId } from 'mongodb';

export type Favourite = {
  id: string;
  hike_ids: ObjectId[];
  nickname: string;
};

export type UserDetails = {
  _id: ObjectId;
  username: string;
  password: string;
  favourites: Favourite[];
};

export type User = {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
};
