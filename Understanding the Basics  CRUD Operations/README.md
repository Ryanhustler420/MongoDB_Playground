## Finding Inserting Deleting Updating Elements

> db.flightData.deleteOne({ departureAirport: "TXL" })

> db.flightData.deleteOne({ _id: "txl-lhr-1" })

> db.flightData.updateOne({distance: 12000}, { $set:{marker: "delete"} })

> db.flightData.updateOne({distance: 12000}, { $set:{marker: "delete"} })

> db.flightData.updateMany({}, {$set: {marker: "toDelete"}})

> db.flightData.deleteMany({marker: "toDelete"})

## Insert Many

```javaScript
    db.flightData.insertMany([
        {
        "departureAirport": "MUC",
        "arrivalAirport": "SFO",
        "aircraft": "Airbus A380",
        "distance": 12000,
        "intercontinental": true
        },
        {
        "departureAirport": "LHR",
        "arrivalAirport": "TXL",
        "aircraft": "Airbus A320",
        "distance": 950,
        "intercontinental": false
        }
    ])
```

## Finding Data

> db.flightData.find({intercontinental: true}).pretty()

```javascript
    {
        "_id" : ObjectId("5cd70dbcdff3795a34eafec0"),
        "departureAirport" : "MUC",
        "arrivalAirport" : "SFO",
        "aircraft" : "Airbus A380",
        "distance" : 12000,
        "intercontinental" : true
    }
```

> db.flightData.find({distance: 12000}).pretty()

```javascript
    {
        "_id" : ObjectId("5cd70dbcdff3795a34eafec0"),
        "departureAirport" : "MUC",
        "arrivalAirport" : "SFO",
        "aircraft" : "Airbus A380",
        "distance" : 12000,
        "intercontinental" : true
    }
```
> db.flightData.find({distance: { $gt: 10000 }}).pretty()

```javascript
    {
        "_id" : ObjectId("5cd70dbcdff3795a34eafec0"),
        "departureAirport" : "MUC",
        "arrivalAirport" : "SFO",
        "aircraft" : "Airbus A380",
        "distance" : 12000,
        "intercontinental" : true
    }
```
> db.flightData.find({distance: { $gt: 900 }}).pretty()

```javascript
    {
        "_id" : ObjectId("5cd70dbcdff3795a34eafec0"),
        "departureAirport" : "MUC",
        "arrivalAirport" : "SFO",
        "aircraft" : "Airbus A380",
        "distance" : 12000,
        "intercontinental" : true
    }
    {
        "_id" : ObjectId("5cd70dbcdff3795a34eafec1"),
        "departureAirport" : "LHR",
        "arrivalAirport" : "TXL",
        "aircraft" : "Airbus A320",
        "distance" : 950,
        "intercontinental" : false
    }
```

> db.flightData.findOne({distance: { $gt: 900 }}) [Pretty() would not work on this method]

```javascript
    {
        "_id" : ObjectId("5cd70dbcdff3795a34eafec0"),
        "departureAirport" : "MUC",
        "arrivalAirport" : "SFO",
        "aircraft" : "Airbus A380",
        "distance" : 12000,
        "intercontinental" : true
    }
```

## Update Vs UpdateMany()

> db.flightData.updateOne({_id : ObjectId("5cd70dbcdff3795a34eafec0")}, { $set: { delayed: true } })

> db.flightData.update({_id : ObjectId("5cd70dbcdff3795a34eafec0")}, { $set: { delayed: false } })

> db.flightData.update({_id : ObjectId("5cd70dbcdff3795a34eafec0")}, { delayed: false } ) [You Can Ommite $set on update(), But Overwrite Previous Data :( ]

```
> db.flightData.find().pretty()

{ "_id" : ObjectId("5cd70dbcdff3795a34eafec0"), "delayed" : false }

{
        "_id" : ObjectId("5cd70dbcdff3795a34eafec1"),
        "departureAirport" : "LHR",
        "arrivalAirport" : "TXL",
        "aircraft" : "Airbus A320",
        "distance" : 950,
        "intercontinental" : false
}

```

> Use ReplaceOne() instead of Update() 

```javaScript

db.flightData.replaceOne({_id : ObjectId("5cd70dbcdff3795a34eafec0")}, {
    "departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "intercontinental": true
})

```

## Understand find() the Cursor Object

> db.passengers.insertMany(paste here passengers array)


> db.passengers.find().pretty()

```javaScript
{
        "_id" : ObjectId("5cd71a7e238517bf02d7a011"),
        "name" : "Gaurav Kumar",
        "age" : 28
}
{
        "_id" : ObjectId("5cd71a7e238517bf02d7a012"),
        "name" : "Maria Jones",
        "age" : 30
}
{
        "_id" : ObjectId("5cd71a7e238517bf02d7a013"),
        "name" : "Alexandra Maier",
        "age" : 27
}
{
        "_id" : ObjectId("5cd71a7e238517bf02d7a01c"),
        "name" : "Freddy Melver",
        "age" : 41
}
{
        "_id" : ObjectId("5cd71a7e238517bf02d7a01d"),
        "name" : "Alexis Bohed",
        "age" : 35
}
{
        "_id" : ObjectId("5cd71a7e238517bf02d7a021"),
        "name" : "Albert Twostone",
        "age" : 68
}

Type "it" for more

> it

{
        "_id" : ObjectId("5cd71a7e238517bf02d7a022"),
        "name" : "Gordon Black",
        "age" : 38
}

> it
no cursor

```

> db.passengers.find().toArray() to get data as an Array at once

> db.passengers.find().forEach((doc) => printjson(doc)); 

## Projection

> db.passengers.find({}, {name: 1}).pretty()

> db.passengers.find({}, {name: 1, _id: 0}).pretty()

## Embedded Document

> db.flightData.updateMany({}, {$set: {status: {description: "on-time", lastUpdated: "1 hour ago"}}})

> db.flightData.updateMany({}, {$set: {status: {description: "on-time", lastUpdated: "1 hour ago", details: { "responsible": "Gaurav Gupta" } } } })
