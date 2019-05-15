// mongoimport persons.json -d contactData -c contacts --jsonArray

// Adding A Single Field Index

db.contacts.find ({'dob.age': {$gt: 60}}).pretty ();

db.contacts.explain ().find ({'dob.age': {$gt: 60}});

db.contacts.explain ('executionStats').find ({'dob.age': {$gt: 60}});

db.contacts.createIndex({"dob.age": 1});