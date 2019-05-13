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
