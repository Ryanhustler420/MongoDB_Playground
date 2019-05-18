// Working with int32

db.persons.insertOne({name: "Gaurav", age: 21});

db.persons.findOne();

db.persons.stats();

db.persons.deleteMany({});

db.persons.insertOne({age: 21})

db.persons.stats();

db.persons.deleteMany({});

// db.persons.insertOne({age: NumberInt("21")})
db.persons.insertOne({age: NumberInt(21)})

// Working with int64

db.persons.deleteMany({});

db.companies.insertOne({valuation: NumberInt("5000000000")});

db.companies.findOne(); // you will get wrong result

db.companies.insertOne({valuation: NumberInt("2147483647")}); // if we exceed value by 1. you will get -ve value

db.companies.find().pretty();

db.companies.insertOne({valuation: 2147483648});

db.companies.find().pretty();

db.companies.insertOne({valuation: NumberLong(2147483648)});

db.companies.find().pretty();

db.companies.insertOne({valuation: NumberLong(9223372036854775807)}); // error because it is very big

db.companies.insertOne({valuation: NumberLong("9223372036854775807")}); // always use quotation marks

db.companies.find().pretty();

// Doing Maths with Floats int32s int64s

db.accounts.insertOne({name: "Gaurav", amount: "123456789987654321123456789"});

db.accounts.find().pretty();

db.accounts.deleteMany({});

db.accounts.insertOne({name: "Gaurav", amount: "10"});

db.accounts.updateOne({}, {$inc: {amount: 10}}); // throw error because of type

db.accounts.deleteMany({});

db.accounts.insertOne({name: "Gaurav", amount: NumberInt("10")});

db.accounts.updateOne({}, {$inc: {amount: 10}});

db.accounts.find().pretty();

db.accounts.deleteMany({});

db.accounts.updateOne({}, {$inc: {amount: NumberInt("10")}});

// Companies Collection

db.companies.deleteMany({})

db.companies.insertOne({valuation: NumberLong("123456789123456789")});

db.companies.findOne();

db.companies.updateOne({}, {$inc: {valuation: NumberLong("1")}});

db.companies.findOne();

// Whats Wrong with Normal Doubles

db.science.insertOne({a: 0.3, b: 0.1})

db.science.find().pretty();

db.science.aggregate([{$project:{ result: { $subtract: ["$a", "$b"] } }}])

// Working with Decimal 128bit

db.science.deleteMany({})

db.science.insertOne({a: NumberDecimal("0.3"), b: NumberDecimal("0.1")})

db.science.find().pretty()

db.science.aggregate([{$project:{ result: { $subtract: ["$a", "$b"] } }}])

db.science.updateOne({}, {$inc: {a: NumberDecimal("0.1")}})

db.nums.insertOne({a: 0.1});

db.nums.stats(); // check size

db.nums.deleteMany({})

db.nums.insertOne({a: NumberDecimal(0.1)});

db.nums.stats(); // check size must me grater than what we had normally