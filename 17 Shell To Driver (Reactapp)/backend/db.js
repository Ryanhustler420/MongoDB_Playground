const mongodb = require ('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoDdUrl =
  'mongodb+srv://<username>:<password>@cluster0-erk3k.mongodb.net/ReactShopDB?retryWrites=true';

let _db;

const initDb = callback => {
  if (_db) {
    console.log ('Database is already initialized');
    return callback (null, _db);
  }
  MongoClient.connect (mongoDdUrl,  { useNewUrlParser: true })
    .then (client => {
      _db = client;
      callback (null, _db);
    })
    .catch (err => {
      callback (err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error ('Database not initialized!');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
