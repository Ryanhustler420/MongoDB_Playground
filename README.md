# MongoDB_Playground

> show dbs

> use shop --> Create new Database if that is'nt exist or use if that db exist

> db.products.insertOne({name: "A Book, price: 12.99"})

> db.products.find()

> db.products.find().pretty()

> db.products.insertOne({name:"A Asus Nitro Computer", price:1299.94, description: "This is high performance computer machine", details: {cpu: "Intel i9 9900",memory:"32gb ddr4",graphics: "Nvidia GTX 3500Ti"}})