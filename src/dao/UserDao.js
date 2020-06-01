const Dao = require('./Dao.js');
const bcrypt = require('bcryptjs');
const mongo = require('mongodb');

module.exports = class UserDao extends Dao {
    constructor(collection) {
        super();
        this.collection = collection
    }

    async create_user(username, password) {
        const taken = await this.db.collection(this.collection).findOne({ username: username });
        if(taken) return false;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const new_user = {
            username: username,
            password: hash,
            favourites: []
        };
        return (await this.db.collection(this.collection).insertOne(new_user)).result.ok;
    }

    find_user_by_username(username) {
        return this.db.collection(this.collection).findOne({ username: username });
    }

    find_user_by_id(id) {
        return this.db.collection(this.collection).findOne({_id: new mongo.ObjectID(id)});
    }

    async save_hike(user_id, hike_id) {
        //Checks if user already has favourited the hike
        const present = await this.db.collection(this.collection).findOne({
            _id: new mongo.ObjectID(user_id),
            favourites: {
                $in: [new mongo.ObjectID(hike_id)]
            }
        });

        if(present) return false; //Return is already favourited

        return await this.db.collection(this.collection).updateOne(
            { 
                _id: new mongo.ObjectID(user_id) 
            },
            {
                $push: {
                    favourites: new mongo.ObjectID(hike_id)
                }
            }
        );
    }

    async delete_hike(user_id, hike_id) {
        return await this.db.collection(this.collection).updateOne(
            {
                _id: new mongo.ObjectID(user_id)
            },
            {
                $pull: {
                    favourites: new mongo.ObjectID(hike_id)
                }
            }
        );
    }    
}