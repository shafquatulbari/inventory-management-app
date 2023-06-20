var express = require('express'); //imports the express module
var cors = require('cors'); //imports the cors module
var app = express();//creates an express application 

// Apply the CORS middleware to the Express application. 
// This allows client applications running on other domains to make requests to our server
app.use(cors());
app.use(express.json()); // This tells Express to parse incoming requests with JSON payloads, so we can access the data in a convenient way

// An array to store item objects. Each object includes name, description, price, and image attributes
const items = [
    {
        "name": "BOX",
        "description": "this is just a simple box.",
        "price": 10.00,
        "image": "https://img.uline.com/is/image/uline/S-4061?$Mobile_Zoom$"
    }
];

// Defines a route handler for GET requests to '/items', which responds with all items in JSON format
app.get('/items', function(req, res) { // The `get` method is used to handle GET requests. In this case, it gets the list of items.
  // `res.json` is a function that sends a JSON response. In this case, it's sending the entire `items` array.
  // This effectively returns the current list of items to the client who made the request.
  res.json(items);
});

// Defines a route handler for POST requests to '/items', which adds a new item to the items array
// and responds with the newly added item in JSON format
app.post('/items', function(req, res) { // The `post` method is used to handle POST requests. In this case, it adds a new item to the `items` array.
  // `req.body` contains the HTTP request body. In this case, it contains the new item that the client sent.
  // This new item is stored in the `newItem` constant.
  const newItem = req.body;
  // The `push` method is used to add the new item to the end of the `items` array.
  items.push(newItem);
  // `res.status(201).json(newItem)` sends a response with HTTP status code 201 (indicating that a new resource was created),
  // and with the new item as the body. This effectively returns the newly added item to the client who made the request.
  res.status(201).json(newItem);
});

// Defines a route handler for DELETE requests to '/items/:name', which removes an item from the items array
// based on the item's name specified in the request URL
app.delete('/items/:name', function(req, res) { // The `delete` method is used to handle DELETE requests. In this case, it removes an item from the `items` array.
  // `req.params.name` extracts the 'name' URL parameter from the incoming HTTP request. This will be the name of the item that we want to delete.
  const name = req.params.name;
  // `findIndex` is a method on arrays that returns the first index where the given function returns true.
  // Here, it's used to find the index of the item that has the same name as the one we want to delete.
  const index = items.findIndex(item => item.name === name);
  // If the item is found (i.e., `index !== -1`, since `findIndex` returns -1 when no elements match)
  if (index !== -1) {
    // `splice` is used to remove the item from the `items` array at the found index.
    // The first parameter is the start index and the second parameter is the number of elements to remove.
    items.splice(index, 1);
  }
  // Regardless of whether an item was found or not, the server sends back an HTTP status of 200 
  // to indicate that the DELETE request was received and processed. `.end()` is used to end the response process.
  res.status(200).end();
});

// Defines a route handler for PUT requests to '/items/:name', which updates an existing item in the items array
// based on the item's name specified in the request URL, and responds with the updated item in JSON format
app.put('/items/:name', function(req, res) { // The `put` method is used to update an existing resource, in this case an item in the `items` array.
  const name = req.params.name; // `req.params.name` extracts the 'name' URL parameter from the incoming HTTP request.
  const updatedItem = req.body; // `req.body` contains the JSON payload of the incoming HTTP request, which is the updated item data.
  // `findIndex` is a method on arrays that returns the first index where the given function returns true.
  // Here, it's used to find the index of the item that has the same name as the one provided in the URL parameter.
  const index = items.findIndex(item => item.name === name); 
  if (index !== -1) { // If the item is found (i.e., `index !== -1`, since `findIndex` returns -1 when no elements match)
    items[index] = updatedItem; // Update the item at the found index with the updated item data
    res.json(updatedItem); // Respond to the HTTP request with a JSON object of the updated item.
  } else {
    // If the item is not found, it sends back an HTTP status of 404 and an error message
    res.status(404).json({ error: 'Item not found' });
  }
});

// Starts the server and listens for connections on port 3000
app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});

/*If you didn't use CORS in your Express app, and your Express API was hosted on a different domain (or even a different port) than your frontend, 
the browser would block requests from your frontend to your API due to the same-origin policy. 
This would prevent your frontend from fetching data from your API, making the API essentially unusable from your frontend.

By using the cors middleware in Express, you can respond to CORS preflight requests with the appropriate headers that tell 
the browser it is allowed to fetch resources from your API. This enables your API to be used from a frontend hosted on a different domain or port.*/

//Took help from CHATGPT to understand cors issue and in commenting the code.