var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json());

const items = [
    {
        "name": "BOX",
        "description": "this is just a simple box.",
        "price": 10.00,
        "image": "https://img.uline.com/is/image/uline/S-4061?$Mobile_Zoom$"
    }
];

app.get('/items', function(req, res) {
  res.json(items);
});

app.post('/items', function(req, res) {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/items/:name', function(req, res) {
  const name = req.params.name;
  const index = items.findIndex(item => item.name === name);
  if (index !== -1) {
    items.splice(index, 1);
  }
  res.status(200).end();
});

app.put('/items/:name', function(req, res) {
  const name = req.params.name;
  const updatedItem = req.body;
  const index = items.findIndex(item => item.name === name);
  if (index !== -1) {
    items[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});