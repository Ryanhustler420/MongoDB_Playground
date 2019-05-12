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
