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

// Updating Matched Array Elements

db.users.updateMany({"hobbies": {$elemMatch:{title:"Sports",frequency:{$gte: 3}}}},{$set: {"hobbies.$.highFrequency": true}})

// Updatating All Array Elements

db.users.find({"hobbies.frequency": {$gt: 2}}).pretty()

db.users.updateMany({"hobbies.frequency": {$gt: 2}},{$set: {"hobbies.$.goodFrequency": true}}) // changes the first match

db.users.updateMany({totalAge: {$gt: 30}},{$inc: {"hobbies.$[].frequency": -1}}) // update each element in array

// Finding Updating Specific Fields

db.users.find({"hobbies.frequency": {$gt: 2}}).pretty()

db.users.updateMany({"hobbies.frequency": {$gt: 2}},{$set:{"hobbies.$[el].goodFrequency": true}}, {arrayFilters: [{"el.frequency": {$gt: 2}}]})

// Adding Elements to Arrays

db.users.updateOne({name: "Maria"},{$push: {hobbies: {title: "Sports", frequency: 2}}})

db.users.updateOne({name: "Maria"},{$push: {hobbies: {$each: [{title: "Good Wine", frequency: 1},{title: "Hicking", frequency: 2}], $sort: {frequency: -1}}}})

// Removing Elements from Arrays

db.users.updateOne({name: "Maria"}, {$pull: {hobbies: {title: "Hicking"}}})

db.users.updateOne({name: "Maria"}, {$pull: {hobbies: {title: "Good Wine"}}})

db.users.updateOne({name: "Maria"}, {$pull: {hobbies: {frequency: 2}}})

db.users.find().pretty();

db.users.updateOne({name: "Chris"},{$pop: {hobbies: 1}})

db.users.updateOne({name: "Chris"},{$pop: {hobbies: -1}})

db.users.find().pretty();

//  $addToSet to prevent duplicate value in array

db.users.updateOne({name: "Maria"}, {$addToSet: {hobbies: {title: "Hicking", frequency: 2}}})

