const Router = require('express').Router;

const router = Router();
const mongodb = require('mongodb');
const Decimal128 = mongodb.Decimal128;

const db = require('../db');

// Get list of products products
router.get('/', (req, res, next) => {
    const products = [];
    db.getDb().db().collection('products').find({}).forEach(prodDoc => {
      prodDoc.price = prodDoc.price.toString();      
      products.push(prodDoc);
    }).then(result => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(201).json({ message: 'An error occured.' });
    });
});

// Get single product
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

// Add new product
// Requires logged in user
router.post('', (req, res, next) => {
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
      image: req.body.image
    };
    db.getDb().db().collection('products').insertOne(newProduct).then(result => {
      res.status(201).json({ message: 'Product added', productId: result.insertedId });
    })
    .catch(err => {
      res.status(201).json({ message: 'An error occured.' });
    });
});

// Edit existing product
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image
  };
  console.log(updatedProduct);
  res.status(200).json({ message: 'Product updated', productId: 'DUMMY' });
});

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  res.status(200).json({ message: 'Product deleted' });
});

module.exports = router;
