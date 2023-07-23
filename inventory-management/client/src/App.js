// Importing necessary hooks and modules from react, react-redux and local redux store.
import React, { useState, useEffect } from 'react'; // useState for local state, useEffect for side effects
import { useSelector, useDispatch } from 'react-redux'; // hooks from react-redux to work with Redux
import { addItem, deleteItem, clearItems, editItem } from '../src/redux/items'; // action creators
import '../src/App.css'; // Styles for the component

// A functional component to render the details of an item
function Detail({ item }) {
  return (
      // Creating a div to show item's details
      <div>
          <h3>{item.name}</h3> {/* Displaying the item name as a heading */}
          <p>{item.description}</p> {/* Displaying the item description as a paragraph  */}
          <p>${item.price}</p> {/* Displaying the item price as a paragraph */}
          <img className="item-image" src={item.image} alt={item.name} /> {/* Displaying the item image */}
          <p>Purchased by: {item.itemPurchaser}</p> {/* Displaying the purchaser of the item  */}
      </div>
  );
}

// Main App component
function App() {
  const items = useSelector((state) => state); // Getting the state from redux store
  const dispatch = useDispatch(); // Getting the dispatch function
  
  // Creating local states for each field of item and some others like selectedItem, editing and editedId
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedId, setEditedId] = useState("");
  const [itemPurchaser, setItemPurchaser] = useState("");

  // Running an effect to fetch the items when the component mounts
  useEffect(() => {
    fetch('https://bari-deploy-server.onrender.com/items')
      .then(response => response.json())
      .then(data => {
        dispatch(clearItems()); // Clearing items in redux store
        data.forEach(item => dispatch(addItem(item))); // Dispatching each item to the redux store
      });
  }, [dispatch]);

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing the default form submit action
    const newItem = { name, description, price, image, itemPurchaser }; // Creating a new item object
    // Making a POST request to the server with the new item
    fetch('https://bari-deploy-server.onrender.com/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      dispatch(addItem(json)); // Adding the new item to redux store
      // Clearing the form fields
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setItemPurchaser("");
    })
    .catch(error => console.error('Error:', error)); // Logging the error if any
  };

  // Handler function to clear the form fields
  const handleClear = () => {
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setItemPurchaser("");
  };

  // Handler function to delete an item
  const handleDelete = (item) => {
      // Making a DELETE request to the server with the item id
      fetch(`https://bari-deploy-server.onrender.com/${item._id}`, {
        method: 'DELETE',
      }).then(() => {
        dispatch(deleteItem(item)); // Removing the item from redux store
        if (selectedItem === item) {
          setSelectedItem(null); // Deselecting the item if it is selected
        }
      });
  };

  // Handler function to edit an item
  const handleEdit = (item) => {
      // Setting the form fields with the item details
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
      setImage(item.image);
      setItemPurchaser(item.itemPurchaser);
      setEditedId(item._id);
      setEditing(true); // Enabling editing mode
  };

  // Handler function to update an item
  const handleUpdate = (e) => {
      e.preventDefault(); // Preventing the default form submit action
      const updatedItem = { name, description, price, image, itemPurchaser }; // Creating the updated item object
      // Making a PUT request to the server with the updated item
      fetch(`https://bari-deploy-server.onrender.com/${editedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
      }).then(response => response.json())
      .then(data => {
        dispatch(editItem(data)); // Updating the item in the redux store
        // Clearing the form fields and disabling editing mode
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setItemPurchaser("");
        setEditing(false);
      });
  };

  // Rendering the component
  return (
    <div className="App">
      <form onSubmit={editing ? handleUpdate : handleSubmit}> {/* Using different handler functions based on editing mode */}
        {/* Creating controlled input fields for each item attribute */}
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="url" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
        <input type="text" placeholder="Item Purchaser" value={itemPurchaser} onChange={e => setItemPurchaser(e.target.value)} required />
        <button type="submit">{editing ? "Update" : "Add"}</button> {/* Changing the button text based on editing mode*/}
        <button type="button" onClick={handleClear}>Clear</button> {/* Button to clear the form fields */}
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <button onClick={() => setSelectedItem(item)}>View</button> {/* Button to select an item */}
            <button onClick={() => handleDelete(item)}>Delete</button> {/* Button to delete an item */}
            <button onClick={() => handleEdit(item)}>Edit</button> {/* Button to edit an item */}
            {item.name} {/* Displaying the item name */}
          </li>
        ))}
      </ul>
      {selectedItem && <Detail item={selectedItem} />} { /* Rendering the Detail component with the selected item */}
    </div>
  );
}

export default App; // Exporting the App component

//took help from chatgpt for new way to display items and add an additional attribute called purchaser name. Also took help from chatgpt for commenting code