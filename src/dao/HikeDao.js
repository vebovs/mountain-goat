const Dao = require('./Dao.js');

module.exports = class HikeDao extends Dao {

    getHikes(data, callback) {
        let values = [data.bottom, data.top, data.left, data.right];
        super.query(
            'SELECT * FROM hike'
            + ' WHERE'
            + ' lat BETWEEN ? AND ?'
            + ' AND'
            + ' lng BETWEEN ? AND ?'
            , values, callback
        );
    }
}