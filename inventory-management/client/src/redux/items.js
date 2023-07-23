// Action types
// Define a string constant for each type of action our Redux store will handle
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CLEAR_ITEMS = 'CLEAR_ITEMS';
const EDIT_ITEM = 'EDIT_ITEM';

//ADD_ITEM and DELETE_ITEM are constants representing action types. The addItem and deleteItem functions are action creators.
// Action creators return an action object, which has a 'type' and optionally a 'payload'
// Action creator for adding an item
export const addItem = (item) => ({
    //type field (which represents the action type)
    type: ADD_ITEM,
    //payload field (which represents the data associated with the action).
    payload: item
});

export const deleteItem = (item) => ({
    type: DELETE_ITEM,
    payload: item
});

export const clearItems = () => ({
    type: CLEAR_ITEMS
});

export const editItem = (item) => ({
    type: EDIT_ITEM,
    payload: item
});

// Initial state
const initialState = [];

// Reducer
//The itemsReducer is a function that takes the current state and an action as arguments and returns the new state
const itemsReducer = (state = initialState, action) => {
    // Depending on the type of the action, we will have different state transformations
    switch (action.type) {
        case ADD_ITEM:
            // If action is ADD_ITEM, add the payload to the state, create a new array with all the old items plus the new item
            return [...state, action.payload];
        case DELETE_ITEM:
            //The reducer uses the ... (spread) operator to return a new state array that includes the new item or exclude the deleted item, rather than modifying the existing state array. This is an example of reducer immutability.
            // If action is DELETE_ITEM, remove the payload from the state
            // If action is DELETE_ITEM, create a new array with all the items except the one to delete
            return state.filter(item => item !== action.payload);
        case CLEAR_ITEMS:
            // If action is CLEAR_ITEMS, return an empty array
            return [];
        case EDIT_ITEM:
            // If action is EDIT_ITEM, create a new array where the edited item is replaced
            //map function to create a new array that will replace the current state. 
            //The map function goes through each item in the array and applies a function to it, returning a new array with the transformed items.
            return state.map(item => 
                item.name === action.payload.name ? action.payload : item
            );
           //If the name of the current item being processed is the same as the name of the item we're looking to update, 
           //use the updated item (action.payload) in the new array. If not, just use the current item as is".
        default:
            // If action type is not recognized(none of the above), return the current state without modification
            return state;
    }
}

export default itemsReducer; // Export our reducer so it can be combined with other reducers in the store
//Used Chatgpt for commenting code