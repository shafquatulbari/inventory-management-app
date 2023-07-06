// Import necessary modules
var express = require('express'); // Express.js for web server
var cors = require('cors'); // Enable CORS
var mongoose = require('mongoose'); // Mongoose for MongoDB interactions

// Create an instance of express
var app = express(); 

// Connect to MongoDB database
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox.3z3axor.mongodb.net/?retryWrites=true&w=majority');

// Define Mongoose schema for items in the database
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  itemPurchaser: String
});

// Create Mongoose model from the schema
const Item = mongoose.model('Item', itemSchema);

// Enable CORS
app.use(cors());

// Parse JSON bodies in requests
app.use(express.json());

// Define route to get all items
app.get('/items', function(req, res) {
  Item.find({}, function(err, items) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.json(items);
    }
  });
});

// Define route to add new items
app.post('/items', function(req, res) {
  const newItem = new Item(req.body);
  newItem.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(201).json(newItem);
    }
  });
});

// Define route to delete an item
app.delete('/items/:name', function(req, res) {
  const name = req.params.name;
  Item.deleteOne({ name: name }, function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

// Define route to update an item
app.put('/items/:name', function(req, res) {
  const name = req.params.name;
  const updatedItem = req.body;
  Item.findOneAndUpdate({ name: name }, updatedItem, { new: true }, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.json(result);
    }
  });
});

// Start the server
app.listen(3000, function () {
  console.log('App is listening on port 3000!');
}); 
