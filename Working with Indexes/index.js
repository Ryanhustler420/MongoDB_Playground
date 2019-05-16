// mongoimport persons.json -d contactData -c contacts --jsonArray

// Adding A Single Field Index

db.contacts.find ({'dob.age': {$gt: 60}}).pretty ();

db.contacts.explain ().find ({'dob.age': {$gt: 60}});

db.contacts.explain ('executionStats').find ({'dob.age': {$gt: 60}});

db.contacts.createIndex({"dob.age": 1});

// Index Restrictions

db.contacts.explain ('executionStats').find ({'dob.age': {$gt: 20}}); // no person found and scan entire IXSCAN, which is bad

db.contacts.dropIndex({"dob.age": 1});

db.contacts.explain("executionStats").find({"dob.age": {$gt: 20}});

// Creating Compound Indexes

db.contacts.findOne();

db.contacts.createIndex({gender: 1});

db.contacts.explain ('executionStats').find ({gender: "male"});
// this returns majority docs so creating indexes for gender won't be right to be precise

db.contacts.dropIndex({gender: 1})

db.contacts.createIndex({"dob.age": 1, gender: 1}); // creating one index like pair of age and gender

db.contacts.explain().find({"dob.age": 35, gender: "male"});

db.contacts.explain().find({"dob.age": 35});

db.contacts.explain().find({gender: "male"}); // use COLLSCAN which is clearly not what we want right! it scan age -> gender || left to right [compound indexes works left to right]. you can have upto 31 compound indexes

// Using Indexes for Sorting

db.contacts.explain().find({"dob.age": 35}).sort({gender: 1})

// The Default Index

db.contacts.getIndexes();

// Configuring Indexes

db.contacts.findOne();

db.contacts.createIndex({email: 1}, {unique: true})

// Partial Filters

db.contacts.getIndexes()

db.contacts.createIndex({"dob.age": 1}, {partialFilterExpression:{gender: "male"}})

// only make indexes for ages which are above 60
db.contacts.createIndex({"dob.age": 1}, {partialFilterExpression:{"dob.age": {$gt: 60}}})

db.contacts.find({"dob.age": {$gt: 60}}).pretty();

db.contacts.explain().find({"dob.age": {$gt: 60}});

db.contacts.explain().find({"dob.age": {$gt: 60}, gender: "male"});
