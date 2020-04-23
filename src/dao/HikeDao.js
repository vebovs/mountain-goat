const Dao = require('./Dao.js');

module.exports = class HikeDao extends Dao {
    constructor(collection) {
        super();
        this.collection = collection
    }

    getHike() {
        return this.db.collection(this.collection).find({}).limit(1).toArray();
    }
}