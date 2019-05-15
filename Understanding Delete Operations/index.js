// deleteOne() and deleteMany()

db.users.deleteOne({name: "Chris"})

db.users.deleteMany({ hobbies: { $elemMatch : {title: "Sports", frequency: 3} }})

db.users.deleteMany({ totalAge: {$gt: 30}, hobbies: { $elemMatch : {title: "Sports", frequency: 3} }})

db.users.deleteMany({ totalAge: {$exists: false}, isSporty: true })