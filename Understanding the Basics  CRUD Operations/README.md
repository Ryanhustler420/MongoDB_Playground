## Finding Inserting Deleting Updating Elements

> db.flightData.deleteOne({ departureAirport: "TXL" })

> db.flightData.deleteOne({ _id: "txl-lhr-1" })

> db.flightData.updateOne({distance: 12000}, { $set:{marker: "delete"} })

> db.flightData.updateOne({distance: 12000}, { $set:{marker: "delete"} })

> db.flightData.updateMany({}, {$set: {marker: "toDelete"}})

> db.flightData.deleteMany({marker: "toDelete"})

