import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import itemsReducer from '../src/redux/items';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create Redux store
const store = createStore(itemsReducer);

// Create a root for your React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app inside a Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// Measure performance
reportWebVitals();
//Used Chatgpt for commenting code
