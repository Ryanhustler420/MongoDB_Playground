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