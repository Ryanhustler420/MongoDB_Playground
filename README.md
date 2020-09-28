# MongoDB_Playground

- download mongoDb community server, and while installing please choose custome install and do just next next... because this will create a bin directory
- there must be a folder should automatically get created in your root drive, C:/data/db , if not then you can create this on your own, and as side note it need not be like 'data' then 'db'... you can name these folder as you wish...
- now set the PATH variable in Enviornoment Variables to bin folder, open env variable on windows, click on path under users variables, then paste this 'C:\Program Files\MongoDB\Server\4.4\bin' and click ok, DONE...
- open cmd and type : mongo

> On command prompt

```cmd

  > show dbs

  > use shop --> Create new Database if that is'nt exist or use if that db exist

  > db.products.insertOne({name: "A Book, price: 12.99"})

  > db.products.find()

  > db.products.find().pretty()

  > db.products.insertOne({name:"A Asus Nitro Computer", price:1299.94, description: "This is high performance computer machine", details: {cpu: "Intel i9 9900",memory:"32gb ddr4",graphics: "Nvidia GTX 3500Ti"}})

```
