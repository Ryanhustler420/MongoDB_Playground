// Server
// mongod --auth

// Client
// mongo

// use admin

db.createUser ({
    user: 'Gaurav',
    pwd: '123456',
    roles: ['userAdminAnyDatabase'],
});

db.auth ('Gaurav', '123456');

// show dbs



//  Build in Roles Check In Mongo Docs



// Assigning Roles to Users Database

// mongo --help

// mongo -u Gaurav -p 123456  --authenticationDatabase admin

// use shop

db.createUser({user: 'appdev', pwd: 'dev', roles: ['readWrite']})

db.auth('appdev','dev')

db.products.insertOne({name: "Book"}); // too many users are authenticated Error

db.logout() // quit the mongo shell

// mongo -u appdev -p dev --authenticationDatabase shop

// use shop
// show collections

db.products.insertOne({name: 'A Book'});



// Updating Extending Roles to Other Databases

db.logout();

// use admin

db.auth("Gaurav","123456");

// use shop

db.updateUser("appdev", { roles: ["readWrite", { role: "readWrite", db: "blog" }] })

db.getUser("appdev");

db.logout()

// use shop

db.auth("appdev", "dev");

// use blog

db.posts.insertOne({title: "This Works"})


// Adding SSL Transport Encryption