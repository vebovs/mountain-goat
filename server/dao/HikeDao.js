const Dao = require('./Dao.js');
const mongo = require('mongodb');

module.exports = class HikeDao extends Dao {
  constructor(collection) {
    super(collection);
  }

  async getHikes(points) {
    return await this.collection
      .find({
        geometry: {
          $geoWithin: {
            $geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [
                    points.bottom, //lat
                    points.left, //lon
                  ],
                  [points.top, points.left],
                  [points.top, points.right],
                  [points.bottom, points.right],
                  [points.bottom, points.left],
                ],
              ],
            },
          },
        },
      })
      .toArray();
  }

  async findHikesByIds(data) {
    const ids = data.map((e) => (e = new mongo.ObjectID(e)));
    return await this.collection
      .find({
        _id: {
          $in: ids,
        },
      })
      .toArray();
  }
};
