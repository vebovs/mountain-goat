const Dao = require('./Dao.js');
const bcrypt = require('bcryptjs');
const mongo = require('mongodb');

module.exports = class UserDao extends Dao {
    constructor(collection) {
        super(collection);
    }

    async create_user(username, password) {
        const taken = await this.collection.findOne({ username: username });
        if(taken) return false;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const new_user = {
            username: username,
            password: hash,
            favourites: []
        };
        return (await this.collection.insertOne(new_user)).result.ok;
    }

    find_user_by_username(username) {
        return this.collection.findOne({ username: username });
    }

    find_user_by_id(id) {
        return this.collection.findOne({_id: new mongo.ObjectID(id)});
    }

    async save_hike(user_id, hike_id, nickname) {
        //Checks if user already has favourited the hike
        const present = await this.collection.findOne({
            _id: new mongo.ObjectID(user_id),
            favourites: {
                $in: [new mongo.ObjectID(hike_id)]
            }
        });

        if(present) return false; //Return if already favourited

        return await this.collection.updateOne(
            { 
                _id: new mongo.ObjectID(user_id) 
            },
            {
                $push: {
                    favourites: {
                        id: new mongo.ObjectID(hike_id),
                        nickname: nickname
                    }
                }
            }
        );
    }

    async delete_hike(user_id, hike_id) {
        return await this.collection.updateOne(
            {
                _id: new mongo.ObjectID(user_id)
            },
            {
                $pull: {
                    favourites: {
                        id: new mongo.ObjectID(hike_id)
                    }
                }
            }
        );
    }    
}