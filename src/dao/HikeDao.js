const Dao = require('./Dao.js');

module.exports = class HikeDao extends Dao {
    constructor(collection) {
        super();
        this.collection = collection
    }
    
    getHikes(points) {
        return this.db.collection(this.collection).find({
            "geometry": {
                "$geoWithin": {
                        "$geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [
                                        points.bottom,  //lat
                                        points.left     //lon
                                    ],
                                    [
                                        points.top,
                                        points.left
                                    ],
                                    [
                                        points.top,
                                        points.right
                                    ],
                                    [
                                        points.bottom,
                                        points.right
                                    ],
                                    [
                                        points.bottom,
                                        points.left
                                    ]
                                ]
                            ]
                        }
                    }
                }
            }
        ).toArray();
    }
}