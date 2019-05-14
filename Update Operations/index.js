// Updating Fields with updateOne() updateMany() and set

use user

// it will overwrite
db.users.updateOne({_id: ObjectId("5cd9c2fe1cb08c10423b7557")},{$set:{hobbies: [{title: "Sports", frequency: 5},{title: "Cooking", frequency: 3},{title: "Hicking", frequency: 1}]}})

db.users.find({"hobbies.title": "Sports"}).pretty()

db.users.updateMany({"hobbies.title": "Sports"}, {$set: {isSporty: true}})

// Update Multiple Fields with $set

db.users.find().pretty() // take chris objectId

db.users.updateOne({_id: ObjectId("5cd9c2fe1cb08c10423b7557")},{$set: {age: 40, phone: 423369785}})

// Incrementing Decrementing Values

db.users.updateOne({name: "Chris"},{$inc: {age: 1}})

db.users.updateOne({name: "Chris"},{$inc: {age: -1}})

db.users.updateOne({name: "Chris"},{$inc: {age: 1}, $set: {isSporty: false}})

// Using $min $max and $mul

db.users.updateOne({name: "Chris"}, {$min: {age: 35}})

db.users.updateOne({name: "Chris"}, {$min: {age: 38}}) // this will not work

db.users.updateOne({name: "Chris"}, {$max: {age: 38}})

db.users.updateOne({name: "Chris"}, {$mul: {age: 1.1}})

// Getting Rid Of Fields

db.users.updateMany({isSporty: true}, {$set: {phone: null}})

db.users.updateMany({isSporty: true}, {$unset: {phone: ""}})

// Renaming Fields

db.users.updateMany({}, {$rename: {age: "totalAge"}})

// upsert()

db.users.updateOne({name: "Maria"}, {$set: {age: 29, hobbies: [{title: "Good Food", frequency: 3, isSporty: true}]}}, {upsert: true})

db.users.updateOne({name: "Max"}, {$set: {name: "Boom", age: 29, hobbies: [{title: "Good Food", frequency: 3, isSporty: true}]}}, {upsert: true})