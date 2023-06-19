import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, clearItems,editItem } from '../src/redux/items';
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
  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => {
        dispatch(clearItems());
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

  const handleEdit = (item) => {
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
      setImage(item.image);
      setEditedName(item.name);
      setEditing(true);
  };

  const handleUpdate = (e) => {
      e.preventDefault();
      const updatedItem = { name, description, price, image };
      fetch(`http://localhost:3000/items/${editedName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
      }).then(response => response.json())
      .then(data => {
        dispatch(editItem(data));
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setEditing(false);
      });
  };

    /*Finally, in the return statement of App, 
    you create a form for adding items and display a list of items. 
    You also use the Detail component to display the details of the selected item.*/
    
    // Render component
    return (
      <div className="App">
            <h1>My Inventory</h1>
            <form onSubmit={editing ? handleUpdate : handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="$$$" />
                <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
                <button type="submit">{editing ? 'Update Item' : 'Add Item'}</button>
                <button type="button" onClick={handleClear}>Clear</button>
            </form>
            {items.map(item => (
                <div key={item.name} onClick={() => setSelectedItem(item)}>
                    <h3>{item.name}</h3>
                    <img className="item-image" src={item.image} alt={item.name} />
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item)}}>Delete</button>
                    <button onClick={(e) => {e.stopPropagation(); handleEdit(item)}}>Edit</button>
                </div>
            ))}
            {selectedItem && <Detail item={selectedItem} />}
        </div>
  );
}

export default App;
//Used Chatgpt for commenting code