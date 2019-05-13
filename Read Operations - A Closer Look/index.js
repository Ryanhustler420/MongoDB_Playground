// return first matching doc
db.movies.findOne ({});
// won't give cursor

db.movies.find ().pretty ();
// gives cursor

db.movies.find ({name: 'The Last Ship'}).pretty ();

db.movies.findOne ({runtime: 60});

// Working with Comparison Operators

db.movies.find ({runtime: {$ne: 60}}).pretty ();

db.movies.find ({runtime: {$lt: 40}}).pretty ();

db.movies.find ({runtime: {$lte: 42}}).pretty ();

db.movies.find ({runtime: {$gt: 42}}).pretty ();

// Querying Embedded Fields Arrays

db.movies.find ({'rating.average': {$gt: 7}}).pretty ();

db.movies.find ({genres: 'Drama'}).pretty ();

db.movies.find ({genres: ['Drama']}).pretty ();

db.movies.find ({genres: ['Drama', 'Action']}).pretty ();

// in and nin

db.movies.find ({runtime: {$in: [30, 42]}}).pretty ();

db.movies.find ({runtime: {$nin: [30, 42]}}).pretty ();

// orand nor

db.movies.find({"rating.average": {$lt: 5}}).pretty();

db.movies.find({"rating.average": {$lt: 5}}).count();

db.movies.find ({$or: [{"rating.average": {$lt: 5}},{"rating.average": {$gt: 9.3}}]}).pretty ();

db.movies.find ({$nor: [{"rating.average": {$lt: 5}},{"rating.average": {$gt: 9.3}}]}).pretty ();

// and Operator

db.movies.find({$and: [{"rating.average": {$gt: 9}},{genres: "Drama"}]}).pretty();

db.movies.find({$and: [{"rating.average": {$gt: 9}},{genres: "Drama"}]}).count();

db.movies.find({"rating.average": {$gt: 9}, genres: "Drama"}).count();

db.movies.find({genres: "Drama", genres: "Horror"}).count();

db.movies.find({$and: [{genres: "Drama"}, {genres: "Horror"}]}).count();

// $not Operator

db.movies.find({runtime: {$not: {$eq: 60}}}).count()

db.movies.find({runtime: {$ne: 60}}).count()

// Element Operators

use user

db.users.insertMany([{name: "Gaurav", hobbies: [{title: "Sports", frequency: 3}, {title: "Cooking", frequency: 6}], phone: 0123488756},{name: "Saurav", hobbies: [{title: "Cooking", frequency: 5}, {title: "Car", frequency: 7}], phone: "0123488756", age: 32}])

db.users.find().pretty()

db.users.find({age: {$exists: true}}).pretty()

db.users.find({age: {$exists: true, $gt: 42}}).pretty()

db.users.insertOne({name: "Anna", hobbies: [{title: "Sports", frequency: 2},{title: "Yoga", frequency: 3}], phone: "8089835698", age: null})

db.users.find().pretty()

db.users.find({age: {$exists: false}}).pretty()

db.users.find({age: {$exists: true, $ne: null}}).pretty()

// $type

db.users.find({phone: {$type: "number"}}).pretty()

db.users.find({phone: {$type: "double"}}).pretty()

db.users.find({phone: {$type: ["double","string"]}}).pretty()