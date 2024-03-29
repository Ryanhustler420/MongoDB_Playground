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

// How MongoDB Rejects a Plan

db.customers.getIndexes();

// compound Index
db.customers.createIndex({age: 1, name: 1});

db.customers.explain().find({name: "Gaurav", age: 21});

db.customers.explain("allPlansExecution").find({name: "Gaurav", age: 21});

// Using Multi-Key Indexes

db.contacts.drop()

db.contacts.insertOne({name: "Gaurav", hobbies: ['Cooking', "Sports"], addresses: [{street: "Main Street"},{street: "Second Street"}]});

db.contacts.findOne();

db.contacts.createIndex({hobbies: 1});

db.contacts.find({hobbies: "Sports"}).pretty();

db.contacts.explain('executionStats').find({hobbies: "Sports"}).pretty();

db.contacts.createIndex({addresses: 1});

db.contacts.explain("executionStats").find({"addresses": {street: "Main Street"}}).pretty();

db.contacts.createIndex({"addresses.street": 1});

db.contacts.explain("executionStats").find({"addresses": "Main Street"}).pretty();

// Exception

// Works
db.contacts.createIndex({name: 1, hobbies: 1});

// Dosen't Work
db.contacts.createIndex({addresses: 1, hobbies: 1});

// Text Indexes

db.products.insertMany([{title: 'A Book', description: "This is an awesome book about the young artist"}, {title: 'Red T-Shirt', description: "This T-Shirt is read and its pretty awesome"}]);

db.products.find().pretty();

// it will not work 
// db.products.createIndex({description: 1})


// it will store all the word in array and drop stopping words like a an the
db.products.createIndex({description: "text"});

db.products.find({$text: {$search: "Awesome"}}).pretty()

db.products.find({$text: {$search: "Book"}}).pretty()

db.products.find({$text: {$search: "Red book"}}).pretty()

db.products.find({$text: {$search: "\"Red book\""}}).pretty()

db.products.find({$text: {$search: "\"awesome book\""}}).pretty()

// Text Indexes Sorting

db.products.find({$text: {$search: "awesome t-shirt"}}).pretty()

db.products.find({$text: {$search: "awesome t-shirt"}},{score: {$meta: "textScore"}}).pretty()

db.products.find({$text: {$search: "awesome t-shirt"}},{score: {$meta: "textScore"}}).sort({score:{$meta: "textScore"}}).pretty()

// Creating Combined Text Indexes

db.products.getIndexes()

db.products.findOne()

// You can only have one text Index
db.products.createIndex({title: "text"});

// You can drop text indexes by thier name
db.products.dropIndex("description_text");

// We can merge desc and title
db.products.createIndex({title: "text", description: "text"});
// there will be still only one text index but it will containt both the title and description key

db.products.findOne()

db.products.insertOne({title: 'A Ship', description: "Floats perfectly!"})

db.products.find({$text: {$search: "ship"}}); // will search in title and description as well

// Using Text Indexesto Exclude Words

db.products.find({$text: {$search: "awesome"}}).pretty();

db.products.find({$text: {$search: "awesome -t-shirt"}}).pretty();

// Setting the Default Language Using Weights

db.products.getIndexes();

db.products.dropIndex("title_text_description_text");

db.products.createIndex({title: "text", description: "text"},{default_language: "english", weights:{ title: 1, description: 10 }})

db.products.find().pretty()

// db.products.find({$text: {$search: "", $language: "german"}})
// db.products.find({$text: {$search: "", $caseSensitive: true}})
db.products.find({$text: {$search: "red"}}, {score: {$meta: "textScore"}}).pretty()

// Building Indexes

// mongo credit-rating.js

use credit

show collections

db.ratings.count()

db.ratings.findOne()

db.ratings.createIndex({age: 1});

db.ratings.explain('executionStats').find({age: {$gt : 80}});

db.ratings.dropIndex({age: 1});

db.ratings.getIndexes()

// when creating Indexes. it takes some time and withen than time all the insertion will be blocked so after finishing indexing the query will execute, so this is forground

// now we will do background, 

db.ratings.dropIndex({age: 1});

db.ratings.createIndex({age: 1}, {background: true})