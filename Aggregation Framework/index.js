// mongoimport persons.json -d analytics -c persons --jsonArray

// show dbs

// use analytics

// Using The Aggregation Framework

db.persons.aggregate([{
    $match: {gender: "female"}
}]).pretty()

// Group Stage

// Little Deeper Into the Group Stage