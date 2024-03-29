const Dao = require('./Dao.js');
const bcrypt = require('bcryptjs');
const mongo = require('mongodb');
const uuid = require('uuid');

module.exports = class UserDao extends Dao {
  constructor(collection) {
    super(collection);
  }

  async create_user(username, password) {
    const taken = await this.collection.findOne({ username: username }); // Checks to see if username is available
    if (taken) return false;
    // Hash password before storing it
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const new_user = {
      username: username,
      password: hash,
      favourites: [],
    };
    return (await this.collection.insertOne(new_user)).result.ok;
  }

  async find_user_by_username(username) {
    return await this.collection.findOne({ username: username });
  }

  async find_user_by_id(id) {
    return await this.collection.findOne({ _id: new mongo.ObjectID(id) });
  }

  async save_hike(user_id, hike_ids, nickname) {
    // Check to see if nickname is already in use
    const present = await this.collection.findOne({
      _id: new mongo.ObjectID(user_id),
      'favourites.nickname': nickname,
    });

    if (present) return false; // Return error if already in use

    const res = await this.collection.findOne(new mongo.ObjectID(user_id));

    const ids = hike_ids.map((e) => (e = new mongo.ObjectID(e)));

    const hike_id = uuid.v4();

    await this.collection.updateOne(
      {
        _id: new mongo.ObjectID(user_id),
      },
      {
        $push: {
          favourites: {
            id: hike_id,
            hike_ids: ids,
            nickname: nickname,
          },
        },
      },
    );

    return hike_id;
  }

  async delete_hike(user_id, hike_id) {
    return await this.collection.updateOne(
      {
        _id: new mongo.ObjectID(user_id),
      },
      {
        $pull: {
          favourites: {
            id: hike_id,
          },
        },
      },
    );
  }
};
