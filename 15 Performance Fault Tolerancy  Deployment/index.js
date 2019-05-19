// Understand Capped Collections

// use performence

// db.createCollection("user") // can be name anything
db.createCollection("capped", {capped: true, size: 10000, max: 3}) //bytes

db.capped.insertOne({name: "Gaurav"});
db.capped.insertOne({name: "Saurav"});
db.capped.insertOne({name: "Sangeeta"});

// db.capped.find().sort({$natural: -1}).pretty(); // normal case
db.capped.find().pretty();

db.capped.insertOne({name: "Sarita"});
db.capped.find().pretty();


// Replica Sets Examples

