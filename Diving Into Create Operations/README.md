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