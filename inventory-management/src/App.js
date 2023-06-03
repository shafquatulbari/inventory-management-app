import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../src/redux/items';
import '../src/App.css';


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

    const handleSubmit = (e) => {
        // Prevents page reload
        e.preventDefault();
        // Dispatch add item action
        dispatch(addItem({ name, description, price, image }));
        // Clear inputs
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
    };

    const handleClear = () => {
        // Clears input fields
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
    };

    const handleDelete = (item) => {
        // Dispatch delete item action
        dispatch(deleteItem(item));
        // Deselect deleted item
        if (selectedItem === item) {
            setSelectedItem(null);
        }
    }

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