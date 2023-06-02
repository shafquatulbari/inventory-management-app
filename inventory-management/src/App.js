import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../src/redux/items';
import '../src/App.css';


function Detail({ item }) {
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
    const items = useSelector((state) => state);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem({ name, description, price, image }));
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
    };

    const handleClear = () => {
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
    };

    const handleDelete = (item) => {
        dispatch(deleteItem(item));
        if (selectedItem === item) {
            setSelectedItem(null);
        }
    }

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