db.transformedPersons.createIndex ({location: '2dsphere'});

db.transformedPersons
// geoNear has to be the first in PipeLine
  .aggregate ([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [-18.4, -42.8],
        },
        maxDistance: 1000000,
        num: 10,
        query: {age: {$gt: 30}},
        distanceField: 'distance',
      },
    },
  ])
  .pretty ();
