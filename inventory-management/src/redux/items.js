// Action types
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

// Action creators
export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

export const deleteItem = (item) => ({
    type: DELETE_ITEM,
    payload: item
});

// Initial state
const initialState = [
    {
        name: 'BOX',
        description: 'this is just a simple box.',
        price: 10.00,
        image: 'https://img.uline.com/is/image/uline/S-4061?$Mobile_Zoom$'
    }
];

// Reducer
const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            // If action is ADD_ITEM, add the payload to the state
            return [...state, action.payload];
        case DELETE_ITEM:
            // If action is DELETE_ITEM, remove the payload from the state
            return state.filter(item => item !== action.payload);
        default:
            // If action is none of the above, return the current state
            return state;
    }
}

export default itemsReducer;
//Used Chatgpt for commenting code