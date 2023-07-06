import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, clearItems, editItem } from '../src/redux/items';
import '../src/App.css';

function Detail({ item }) {
  return (
      <div>
          <h3>{item.name}</h3> 
          <p>{item.description}</p>
          <p>${item.price}</p>
          <img className="item-image" src={item.image} alt={item.name} />
          <p>Purchased by: {item.itemPurchaser}</p>
      </div>
  );
}

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
  const [itemPurchaser, setItemPurchaser] = useState("");

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
      const newItem = { name, description, price, image, itemPurchaser };
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
        setItemPurchaser("");
      });
  };

  const handleClear = () => {
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setItemPurchaser("");
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
      setItemPurchaser(item.itemPurchaser);
      setEditedName(item.name);
      setEditing(true);
  };

  const handleUpdate = (e) => {
      e.preventDefault();
      const updatedItem = { name, description, price, image, itemPurchaser };
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
        setItemPurchaser("");
        setEditing(false);
      });
  };

  return (
    <div className="App">
      <form onSubmit={editing ? handleUpdate : handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="url" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
        <input type="text" placeholder="Item Purchaser" value={itemPurchaser} onChange={e => setItemPurchaser(e.target.value)} required />
        <button type="submit">{editing ? "Update" : "Add"}</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <button onClick={() => setSelectedItem(item)}>View</button>
            <button onClick={() => handleDelete(item)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
            {item.name}
          </li>
        ))}
      </ul>
      {selectedItem && <Detail item={selectedItem} />}
    </div>
  );
}

export default App;