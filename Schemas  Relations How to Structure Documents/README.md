## Structuring Documents

> db.products.insertOne({name: "A book", price: 12.99})

> db.products.insertOne({name: "A T-Shirt", price: 22.99})

> db.products.find().pretty()

```javaScript
    {
        "_id" : ObjectId("5cd7ae17ddd48f4e80069c43"),
        "name" : "A Book",
        "price" : 12.99
    }
    {
        "_id" : ObjectId("5cd7ae24ddd48f4e80069c44"),
        "name" : "A T-Shirt",
        "price" : 22.99
    }
```

> db.products.insertOne({name: "A Computer", price: 1299, details: {cpu: "i7 8770"}})

## Structure Schema

> db.products.deleteMany({})

> db.products.insertOne({name: "A book", price: 12.99, details: null})

> db.products.insertOne({name: "A T-Shirt", price: 22.99, details: null})

> db.products.insertOne({name: "A Computer", price: 1299, details: {cpu: "i7 8770"}})

> db.products.find().pretty()

## Data Types In Action

```
> use test

> db.dropDatabase()

```

> use company

> db.companies.insertOne({name: "Facebook Inc", isStartup: true, employees: 54, funding: 12345678901234567890, details: {ceo: "Gaurav Gupta"}, tags: [{title: "super"},{title: "perfect"}], foundingDate: new Date(), insertedAt: new Timestamp()})

**NOTE** Take a look at funding amount!

> db.numbers.insertOne({a: 1})

> db.numbers.findOne()

> db.stats()

```javascript
    {
        "db" : "company",
        "collections" : 2,
        "views" : 0,
        "objects" : 2,
        "avgObjSize" : 134,
        "dataSize" : 268,
        "storageSize" : 20480,
        "numExtents" : 0,
        "indexes" : 2,
        "indexSize" : 20480,
        "fsUsedSize" : 119041662976,
        "fsTotalSize" : 127508934656,
        "ok" : 1
    }
```

> db.companies.drop()

> db.stats()

```javaScript
{
        "db" : "company",
        "collections" : 1,
        "views" : 0,
        "objects" : 1,
        "avgObjSize" : 33,
        "dataSize" : 33,
        "storageSize" : 16384,
        "numExtents" : 0,
        "indexes" : 1,
        "indexSize" : 16384,
        "fsUsedSize" : 119043596288,
        "fsTotalSize" : 127508934656,
        "ok" : 1
}
```

> db.numbers.deleteMany({})

> db.stats()

```javaScript
    {
        "db" : "company",
        "collections" : 1,
        "views" : 0,
        "objects" : 0,
        "avgObjSize" : 0,
        "dataSize" : 0,
        "storageSize" : 16384,
        "numExtents" : 0,
        "indexes" : 1,
        "indexSize" : 16384,
        "fsUsedSize" : 119044149248,
        "fsTotalSize" : 127508934656,
        "ok" : 1
    }
```

> db.numbers.insertOne({a: NumberInt(1)})

> db.stats()

```javaScript
    {
        "db" : "company",
        "collections" : 1,
        "views" : 0,
        "objects" : 1,
        "avgObjSize" : 29,
        "dataSize" : 29,
        "storageSize" : 20480,
        "numExtents" : 0,
        "indexes" : 1,
        "indexSize" : 20480,
        "fsUsedSize" : 119044227072,
        "fsTotalSize" : 127508934656,
        "ok" : 1
    }
```

> typeof db.numbers.findOne().a
> number

## One To One Relations -Embedded

> use hospital

> db.patients.insertOne({name: "Gaurav", age: 21, diseaseSummary: "summary-gaurav-1"})

> db.patients.findOne();

> db.diseaseSummaries.insertOne({ \_id: "summary-gaurav-1", diseases: ["cold","broken heart"]})

> db.diseaseSummaries.findOne()

> db.patients.findOne()

> db.patients.findOne().diseaseSummary

```javascript
    > var dsid = db.patients.findOne().diseaseSummary
    > dsid
```

> db.diseaseSummaries.findOne({ \_id: dsid })

> db.patients.deleteMany({})

> db.patients.insertOne({name: "Gaurav", age: 21, diseaseSummary: {diseases: ["cold","broken heart"]}})

> db.patients.findOne()

## One To One - Using Reference Type

> use car

> db.persons.insertOne({name: "Gaurav", car: {model: "BMW 7x", price: 140000}})

> db.persons.findOne()

> db.persons.deleteMany({})

> db.persons.insertOne({name: "Gaurav", age: 21, salary: 3000})

```javaScript
    {
        "acknowledged" : true,
        "insertedId" : ObjectId("5cd7be8fe35ac880778848bc")
    }
```

> db.cars.insertOne({model: "BMW 7x", price: 140000, owner: ObjectId("5cd7be8fe35ac880778848bc")})

## One To Many - Embedded

> use support

> db.questionThreads.insertOne({creator: "Gaurav Gupta", question: "How does that all work? What is async code?", answers: ["q1a1","q1a2"]})

> db.answers.insertMany([{\_id: "q1a1", text: "It works like that. Checkout My Gist [here](http://github.com/xxxGaurav/asyncTask/secret=false)"}, {\_id: "q1a2", text: "thanks man"}])

> db.answers.find().pretty()

> db.questionThreads.deleteMany({})

> db.questionThreads.insertOne({creator: "Gaurav Gupta", question: "How does that Async Code Works?", answers: [{text: "Like That"},{text: "Thanks!"}]})

> db.questionThreads.findOne()

## One To Many - Using References

> use city

> db.cities.insertOne({name: "New Your City", coordinates: {lat: 21, lng: 55}})

```javaScript
    {
        "acknowledged" : true,
        "insertedId" : ObjectId("5cd80b86966c507bfe09a373")
    }
```

> db.cities.findOne()

> db.citizens.insertMany([{name: "Gaurav Gupta", cityId: ObjectId("5cd80b86966c507bfe09a373")},{name: "Saurav Gupta", cityId: ObjectId("5cd80b86966c507bfe09a373")}])

> db.citizens.find().pretty()

## Many To Many - Embedded

> use shop

> db.products.insertOne({title: "A Book", price: 12.99})

```javaScript
    {
        "acknowledged" : true,
        "insertedId" : ObjectId("5cd82bb4966c507bfe09a376")
    }
```

> db.customers.insertOne({name: "Gaurav Gupta", age: 21})

```javaScript
    {
        "acknowledged" : true,
        "insertedId" : ObjectId("5cd82bb8966c507bfe09a377")
    }
```

> db.orders.insertOne({productId: ObjectId("5cd82bb4966c507bfe09a376"), customerId: ObjectId("5cd82bb8966c507bfe09a377")})

> db.orders.find().toArray()

> db.orders.drop()

> db.products.insertOne({title: "A Book", price: 12.99})

```javaScript
    {
        "acknowledged" : true,
        "insertedId" : ObjectId("5cd82cac966c507bfe09a379")
    }
```

> db.customers.insertOne({name: "Gaurav Gupta", age: 21})

```javaScript
    {
        "acknowledged" : true,
        "insertedId" : ObjectId("5cd82cb1966c507bfe09a37a")
    }
```

> db.customers.updateOne({}, {$set: {orders: [{productId: ObjectId("5cd82cac966c507bfe09a379"), quantity: 3}]}})

> db.customers.findOne()

> db.customers.update({}, {$set: {orders: [ {title: "A Book", price: "12.99", quantity: 2} ]}})

## Many To Many - Using References

> use bookRegistry

> db.books.insertOne({name: "My favorite Book", authors: [{name: "Gaurav Gupta", age: 21}, {name: "Saurav Gupta", age: 23}]})

> db.books.find().pretty()

> db.authors.insertMany([{name: "Gaurav Gupta", age: 21, address: {street: "Main 420 ..."}},{name: "Saurav Gupta", age: 23, address: {street: "Main Street Tree"}}])

> db.authors.find().pretty()

> db.books.updateOne({}, {$set: {authors: [ObjectId("5cd83075966c507bfe09a37c"), ObjectId("5cd83075966c507bfe09a37d")]}})

> db.books.find().pretty()

## Using $lookup for Merging Reference Relations

> db.books.aggregate([{$lookup: {from: "authors", localField: "authors", foreignField: "_id", as: "creators"}}]).pretty()

> Best for Merging Data from Different Collection At One Go

## Implementing an Blog Post DataModel

> use blog

> db.users.insertMany([{name: "Gaurav Gupta", age: 21},{name: "Saurav Gupta", age: 23}])

```shell
    {
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5cd8e8d6966c507bfe09a37e"),
                ObjectId("5cd8e8d6966c507bfe09a37f")
        ]
    }
```

> db.posts.insertOne({title: "My first Post!", text: "This is my first shell based post, I hope u like it", tags: ["new","tech"], creator: ObjectId("5cd8e8d6966c507bfe09a37e"), comments: [{text: "I like this post!", author: ObjectId("5cd8e8d6966c507bfe09a37f")}]})

> db.posts.findOne()

## Adding Collection Document Validation

> db.posts.drop()

> db.posts.findOne();

> Paste `validation.js` code snippet in shell

> db.posts.insertOne({title: "My first Post!", text: "This is my first shell based post, I hope u like it", tags: ["new","tech"], creator: ObjectId("5cd8e8d6966c507bfe09a37e"), comments: [{text: "I like this post!", author: ObjectId("5cd8e8d6966c507bfe09a37f")}]})

> db.posts.findOne()