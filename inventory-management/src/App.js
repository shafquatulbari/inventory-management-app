import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../src/redux/items';
import '../src/App.css';

//The Detail component is a simple functional component that takes an item prop and displays its details:
function Detail({ item }) {
  // Displays item details
  return (
      <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>${item.price}</p>
          <img className="item-image" src={item.image} alt={item.name} />
      </div>
  );
}

/* Here, useSelector is a hook from react-redux that allows you to extract data from the Redux store state. 
useDispatch is another hook from react-redux that gives you access to the dispatch function from the Redux store. 
You're also defining some state variables using the useState hook from React.*/

//App component
function App() {
    // Redux Hooks
    const items = useSelector((state) => state);
    const dispatch = useDispatch();
    
    // Define component state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
      fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(data => {
          data.forEach(item => dispatch(addItem(item)));
        });
    }, [dispatch]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newItem = { name, description, price, image };
      fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      }).then(() => {
        dispatch(addItem(newItem));
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
      });
    };

    const handleClear = () => {
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
    };

    const handleDelete = (item) => {
      fetch(`http://localhost:3000/items/${item.name}`, {
        method: 'DELETE',
      }).then(() => {
        dispatch(deleteItem(item));
        if (selectedItem === item) {
          setSelectedItem(null);
        }
      });
  };

    /*Finally, in the return statement of App, 
    you create a form for adding items and display a list of items. 
    You also use the Detail component to display the details of the selected item.*/
    
    // Render component
    return (
      <div className="App">
          <h1>My Inventory</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" />
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="$$$" />
              <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
              <button type="submit">Add Item</button>
              <button type="button" onClick={handleClear}>Clear</button>
          </form>
          {items.map(item => (
              <div key={item.name} onClick={() => setSelectedItem(item)}>
                  <h3>{item.name}</h3>
                  <img className="item-image" src={item.image} alt={item.name} />
                  <button onClick={(e) => {e.stopPropagation(); handleDelete(item)}}>Delete</button>
              </div>
          ))}
          {selectedItem && <Detail item={selectedItem} />}
      </div>
  );
}

export default App;
//Used Chatgpt for commenting code