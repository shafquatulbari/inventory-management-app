import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import itemsReducer from '../src/redux/items';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


/*The createStore function is used to create a Redux store that holds the 
complete state tree of your app. This is done by passing your reducer to it. 
The <Provider> component from react-redux makes the Redux store available to 
any nested components that need to access Redux store.*/

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
