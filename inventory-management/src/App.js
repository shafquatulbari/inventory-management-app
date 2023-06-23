import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, clearItems,editItem } from '../src/redux/items';
import '../src/App.css';

//The Detail component is a simple functional component that takes an item prop and displays its details:
function Detail({ item }) {
  // Displays item details
  return (
    // JSX for item's details
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

// App is the main functional component of the application
function App() {
  const items = useSelector((state) => state); // Use the useSelector hook to access items from the Redux store
  const dispatch = useDispatch(); // Use the useDispatch hook to get the dispatch function to dispatch actions
  
  // Define local state variables for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // State to keep track of selected item for Detail
  const [editing, setEditing] = useState(false); // State to switch between editing and adding new item
  const [editedName, setEditedName] = useState(""); // State to keep the original name of the item being edited

  // useEffect hook to fetch data from server when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/items') // Fetch items from server
      .then(response => response.json()) // Parse JSON response
      .then(data => { // Process data
        dispatch(clearItems()); // Clear existing items from Redux store
        data.forEach(item => dispatch(addItem(item))); // Add each item from server to Redux store
      });
  }, [dispatch]); // Only rerun this effect if dispatch function changes (which should never happen)

  // Function to handle form submission for adding a new item
  const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from refreshing page
      const newItem = { name, description, price, image }; // Construct new item object from form inputs
      fetch('http://localhost:3000/items', { // Send POST request to server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //took help from CHATGPT to implement the fetch method calls
        body: JSON.stringify(newItem) // Stringify new item object to JSON for request body
      }).then(() => {
        dispatch(addItem(newItem)); // Add new item to Redux store
        setName(""); // Clear form inputs
        setDescription("");
        setPrice("");
        setImage("");
      });
  };

   // Function to handle form reset
  const handleClear = () => { 
      setName(""); // Clear form inputs
      setDescription("");
      setPrice("");
      setImage("");
  };

  // Function to handle deleting an item
  const handleDelete = (item) => {
      fetch(`http://localhost:3000/items/${item.name}`, { // Send DELETE request to server for specified item
        method: 'DELETE',
      }).then(() => {
        dispatch(deleteItem(item)); // Remove item from Redux store
        if (selectedItem === item) { // If deleted item is currently selected
          setSelectedItem(null); // Deselect item
        }
      });
  };

  // Function to handle initiating item editing
  const handleEdit = (item) => {
      setName(item.name); // Set form inputs to current values of item
      setDescription(item.description);
      setPrice(item.price);
      setImage(item.image);
      setEditedName(item.name); // Keep track of original item name for server request
      setEditing(true); // Switch form to editing mode
  };

  // Function to handle form submission for updating an item
  const handleUpdate = (e) => {
      e.preventDefault(); //// Prevent form from refreshing page
      const updatedItem = { name, description, price, image }; // Construct updated item object from form inputs
      fetch(`http://localhost:3000/items/${editedName}`, { // Send PUT request to server for specified item
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem) // Stringify updated item object to JSON for request body
      }).then(response => response.json()) // Parse JSON response
      .then(data => {
        dispatch(editItem(data)); // Update item in Redux store
        setName(""); // Clear form inputs
        setDescription("");
        setPrice("");
        setImage("");
        setEditing(false); // Switch form back to adding mode
      });
  };

    /*Finally, in the return statement of App, 
    you create a form for adding items and display a list of items. 
    You also use the Detail component to display the details of the selected item.*/
    
    // Render component
    return (
      <div className="App">
            <h1>My Inventory</h1>
            <form onSubmit={editing ? handleUpdate : handleSubmit}> {/*Form switches between adding and updating based on editing state*/}
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" /> {/*Input for item name*/}
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" /> {/*Input for Description*/}
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="$$$" /> {/*Input for price*/}
                <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" /> {/*Input for image link*/}
                <button type="submit">{editing ? 'Update Item' : 'Add Item'}</button> {/*Submit button text changes based on editing state*/}
                <button type="button" onClick={handleClear}>Clear</button> {/*Clear form inputs on click*/}
            </form>
            {/*Map over items in Redux store and create a div for each*/}
            {items.map(item => ( 
                <div key={item.name} onClick={() => setSelectedItem(item)}> {/*Clicking on div selects item for Detail*/}
                    <h3>{item.name}</h3>
                    <img className="item-image" src={item.image} alt={item.name} />
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item)}}>Delete</button> {/*Button to delete item*/}
                    <button onClick={(e) => {e.stopPropagation(); handleEdit(item)}}>Edit</button> {/*Button to edit item*/}
                </div>
            ))}
            {selectedItem && <Detail item={selectedItem} />} {/*If an item is selected, display Detail component for item*/}
        </div>
  );
}

export default App; // Export App component for use in other modules
//Used Chatgpt for commenting code and understanding the fetch method calls and implementation