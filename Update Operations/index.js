// Updating Fields with updateOne() updateMany() and set

use user

// it will overwrite
db.users.updateOne({_id: ObjectId("5cd9c2fe1cb08c10423b7557")},{$set:{hobbies: [{title: "Sports", frequency: 5},{title: "Cooking", frequency: 3},{title: "Hicking", frequency: 1}]}})

db.users.find({"hobbies.title": "Sports"}).pretty()

db.users.updateMany({"hobbies.title": "Sports"}, {$set: {isSporty: true}})