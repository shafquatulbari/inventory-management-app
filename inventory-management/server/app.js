// Importing necessary modules
var express = require('express'); // For creating the server
var cors = require('cors'); // For handling Cross-Origin Resource Sharing
var mongoose = require('mongoose'); // For connecting and interacting with MongoDB

// Create an Express app
var app = express();

const corsOptions = {
  origin: "https://bari-deploy-client.onrender.com", // frontend URI (ReactJS)
}

// Connect to the MongoDB server using Mongoose
// Replace this string with your own MongoDB URI
mongoose.connect(`mongodb+srv://m001-student:m001-mongodb-basics@sandbox.3z3axor.mongodb.net/?retryWrites=true&w=majority`, { 
    useNewUrlParser: true, // Use new URL parser instead of the deprecated one
    useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
});

// Define the schema for items
const itemSchema = new mongoose.Schema({
  name: String, // Name of the item
  description: String, // Description of the item
  price: Number, // Price of the item
  image: String, // Image of the item
  itemPurchaser: String // Who bought the item
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

// Middleware to enable CORS
app.use(cors());
app.use(cors(corsOptions));
// Middleware to parse JSON bodies from HTTP requests
app.use(express.json());

// GET endpoint to get all items
app.get('/items', async function(req, res) {
  try {
    const items = await Item.find({}); // Get all items from the DB
    res.json(items); // Send all items as a response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error message if there's an error
  }
});

// POST endpoint to create a new item
app.post('/items', async function(req, res) {
  const newItem = new Item(req.body); // Create a new item using the body of the request
  try {
    const savedItem = await newItem.save(); // Save the item to the DB
    res.status(201).json(savedItem); // Send the saved item as a response
  } catch (err) {
    console.error('Error in saving:', err); // Log the error
    res.status(500).json({ message: err.message }); // Send error message if there's an error
  }
});

// DELETE endpoint to delete an item
app.delete('/items/:id', async function(req, res) {
  try {
    await Item.findByIdAndRemove(req.params.id); // Find the item by its ID and remove it from the DB
    res.status(204).end(); // Send no content response after successful deletion
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error message if there's an error
  }
});

// PUT endpoint to update an item
app.put('/items/:id', async function(req, res) {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find the item by its ID and update it
    res.json(updatedItem); // Send the updated item as a response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error message if there's an error
  }
});

// Start the server on port 3000
// app.listen(3000, function () {
//   console.log('App is listening on port 3000!'); // Log to console when the server starts listening
// });

//Wasn't too sure about how to implement correctly so took some help with chatgpt for implementation of mongoose and in commenting my code as well


module.exports = app;
