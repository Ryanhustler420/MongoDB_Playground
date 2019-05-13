## insert() method

> db.dropDatabase()

> use contactData

> db.persons.insertOne({ name: "Gaurav", age: 21, hobbies: ["programming","mastrubating"] })

> db.persons.insertOne({ name: "Saurav", age: 23, hobbies: ["Dancing","Studing"] })

> db.persons.insertMany([{name: "Sangeeta", age: 19, hobbies: ["sports","yoga"]},{name: "Sarita", age: 25, hobbies: ["Bitching","Watching Tv"]}])

<!-- Dont Use This -->

> db.persons.insert({name:"Maya", age: 19})

> db.persons.find().pretty()

> db.persons.insert([{name: "Sandeep", age: 28}, {name: "Hans", age: 38}])

## Working with Ordered Inserts

> db.hobbies.insertMany([{_id: "sports", name: "Sports"}, {_id: "cooking", name: "Cooking"}, {_id: "cars", name: "Cars"}])

> db.hobbies.find().pretty()

> db.hobbies.insertMany([{_id: "yoga", name: "Yoga"}, {_id: "cooking", name: "Cooking"}, {_id: "hiking", name: "Hiking"}], {ordered: false})

## The `writeConcern` in Practice

> db.persons.insertOne({name: "Gaurav", age: 21}, {writeConcern: {w: 0}})

> db.persons.insertOne({name: "Saurav", age: 21}, {writeConcern: {w: 1}})

> db.persons.insertOne({name: "Michael", age: 21}, {writeConcern: {w: 1, j: false}})

> db.persons.insertOne({name: "Michael", age: 21}, {writeConcern: {w: 1, j: true}}) // it puts the query to Journel First, what if the db crashes than journel might be helpfull

> db.persons.insertOne({name: "Michael", age: 21}, {writeConcern: {w: 1, j: false, wtimeout: 200}})

> db.persons.insertOne({name: "Michael", age: 21}, {writeConcern: {w: 1, j: false, wtimeout: 1}})