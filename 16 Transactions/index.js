// A Typical Usecase

// use blog

db.users.insertOne({name: "Max"});

```javaScript
    {
        "acknowledged" : true,
        "insertedId" : ObjectId("5ce1563d4e556efe426a062a")
    }
```

db.posts.insertMany([{title: "First Post", userId: ObjectId("5ce1563d4e556efe426a062a")}, {title: "Second Post", userId: ObjectId("5ce1563d4e556efe426a062a")}]);

// Transaction In Example

// session helo us to map to pointer of the commands 
// we can chain commands with sessions
const session = db.getMongo().startSession();
session.startTransaction()
const usersCollection = session.getDatabase("blog").users;
const postCollection = session.getDatabase("blog").posts;

db.users.find().pretty(); // his execute as normal
// take user ObjectId

usersCollection.deleteOne({_id:  ObjectId("5cd8e8d6966c507bfe09a37f")});

db.users.find().pretty(); // that user which we deleted should still exist

postCollection.deleteMany({userId: ObjectId("5cd8e8d6966c507bfe09a37f")})

db.posts.find().pretty();

session.commitTransaction() // apply
session.abortTransaction() // void just clean session
