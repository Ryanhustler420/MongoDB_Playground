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

// Applying the Partial Index

db.users.insertMany([{name: "Gaurav", email: "gouravgupta@gmail.com"},{name: "Saurav"}]);

db.users.createIndex({email: 1});

db.users.dropIndex({email : 1});

db.users.createIndex({email:1},{unique: true});

db.users.insertOne({name: "Sangeeta"});

// Saurav has no email! so no email is actually a value so Sangeeta has no email either so that would match , and gives duplicate values error!

db.users.dropIndex({email : 1});

db.users.createIndex({email:1},{unique: true, partialFilterExpression: {email: {$exists: true}}});

db.users.insertOne({name: "Sangeeta"});

db.users.find().pretty();

db.users.insertOne({name: "Sangeeta", email: "gouravgupta@gmail.com"})

// The Time To Live (TTL) Index
// It will work on single indexes and not compound indexes
// It will work on Date indexes.

db.sessions.insertOne({data: "sdkfhkas", createdAt: new Date()})

db.sessions.find().pretty()

db.sessions.createIndex({createdAt: 1}, {expireAfterSeconds: 10});

db.sessions.insertOne({data: "sdkfhkas", createdAt: new Date()})

db.sessions.find().pretty()

// Covered Queries

db.customers.insertMany([{name: "Gaurav", age: 21, salary: 3000},{name: "Saurav", age: 23, salary: 4000}])

db.customers.createIndex({name: 1});

db.customers.explain('executionStats').find({name: "Gaurav"});

db.customers.find({name: "Gaurav"}).count();

// only returns the index value is is `name` in our case. so it won't examined Docs for more detail while we want only name which is simply index value

db.customers.explain('executionStats').find({name: "Gaurav"}, {_id: 0, name: 1});

db.customers.find({name: "Gaurav"}, {_id: 0, name: 1}).count();