const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

export const deleteItem = (item) => ({
    type: DELETE_ITEM,
    payload: item
});

const initialState = [
    {
        name: 'BOX',
        description: 'this is just a simple box.',
        price: 10.00,
        image: 'https://img.uline.com/is/image/uline/S-4061?$Mobile_Zoom$'
    }
];

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, action.payload];
        case DELETE_ITEM:
            return state.filter(item => item !== action.payload);
        default:
            return state;
    }
}

export default itemsReducer;