// Adding GeoJSON Data

// use awesomeplaces

db.places.insertOne({name: "California Academy of Sciences", location: { type: "Point", coordinates: [-122.4724356, 37.7672544] }})

db.places.findOne()

// Running Geo Queries

db.places.find({location: {$near: {$geometry: {type: "Point", coordinates: [-122.471114, 37.771104]}}}}) // Will Throw Error

// Adding a Geospatial Index to Track the Distance

db.places.createIndex({location: "2dsphere"})

db.places.find({location: {$near: {$geometry: {type: "Point", coordinates: [-122.471114, 37.771104]}}}}).pretty()

// here #maxDistance or #minDistance is in meters.

db.places.find({location: {$near: {$geometry: {type: "Point", coordinates: [-122.471114, 37.771104]}, $maxDistance: 30, $minDistance: 10}}}).pretty() // wont give any result

db.places.find({location: {$near: {$geometry: {type: "Point", coordinates: [-122.471114, 37.771104]}, $maxDistance: 500, $minDistance: 10}}}).pretty() // will give result

// Adding Additional Locations

db.places.insertOne({name: "Conservatory of Flowers", location: { type: "Point", coordinates: [-122.4615748, 37.7701756] }})

db.places.insertOne({name: "Golden Gate Tennis Park", location: { type: "Point", coordinates: [-122.4593702, 37.7705046] }})

db.places.insertOne({name: "Nopa", location: { type: "Point", coordinates: [-122.4389058, 37.7747415] }})

db.places.find().pretty()

// Finding Places Inside a Certain Area

const p1 = [-122.4547, 37.77473]
const p2 = [-122.45303, 37.76641]
const p3 = [-122.51026, 37.76411]
const p4 = [-122.51088, 37.77131]

db.places.find({location: {$geoWithin: {$geometry: {type: "Polygon", coordinates: [[p1,p2,p3,p4,p1]]}}}}).pretty()

// Finding out if a User is Inside a Specific Area

db.areas.insertOne({name: "Golden Gate Park", area: {type: "Polygon", coordinates:[[p1,p2,p3,p4,p1]]}})

db.areas.findOne()

db.areas.createIndex({area: "2dsphere"})

db.areas.find({area: {$geoIntersects: {$geometry: {type: "Point", coordinates: [-122.49089,37.76992]}}}}).pretty()

db.areas.find({area: {$geoIntersects: {$geometry: {type: "Point", coordinates: [-122.48446,37.77776]}}}}).pretty()

// Finding Places Within a Certain Radius
db.places.find({location: {$geoWithin: {$centerSphere: [[-122.46203, 37.77286], 1 /* Km */ / 6378.1 /* Radius */ ]}}}).pretty()

//  within 1Km check more in Docs
// https://docs.mongodb.com/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
