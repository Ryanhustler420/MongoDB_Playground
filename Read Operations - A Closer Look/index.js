// return first matching doc
db.movies.findOne ({});
// won't give cursor

db.movies.find ().pretty ();
// gives cursor

db.movies.find ({name: 'The Last Ship'}).pretty ();

db.movies.findOne ({runtime: 60});
