// Action types
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CLEAR_ITEMS = 'CLEAR_ITEMS';

//ADD_ITEM and DELETE_ITEM are constants representing action types. The addItem and deleteItem functions are action creators.
// Action creators
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

// Initial state
const initialState = [];

// Reducer
//The itemsReducer is a function that takes the current state and an action as arguments and returns the new state
const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            // If action is ADD_ITEM, add the payload to the state
            return [...state, action.payload];
        case DELETE_ITEM:
            //The reducer uses the ... (spread) operator to return a new state array that includes the new item or exclude the deleted item, rather than modifying the existing state array. This is an example of reducer immutability.
            // If action is DELETE_ITEM, remove the payload from the state
            return state.filter(item => item !== action.payload);
        case CLEAR_ITEMS:
            return [];
        default:
            // If action is none of the above, return the current state
            return state;
    }
}

export default itemsReducer;
//Used Chatgpt for commenting code