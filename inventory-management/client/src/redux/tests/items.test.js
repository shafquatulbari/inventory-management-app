// Import the itemsReducer and its associated action creators from the 'items' module.
import itemsReducer, { addItem, deleteItem, clearItems } from '../items';

// Use Jest's 'describe' function to group related tests together. In this case, all tests related to the 'itemsReducer' function.
describe('itemsReducer', () => {
  
  // This is a test case. 'it' function defines a test. In this case, it tests the itemsReducer's handling of the initial state.
  it('should handle initial state', () => {
    
    // 'expect' function makes an assertion. In this case, it asserts that the itemsReducer, when given an empty array as a state and an empty action, will return an empty array.
    expect(itemsReducer([], {})).toEqual([]);
  }); 

  // This test case checks how the itemsReducer handles the ADD_ITEM action.
  it('should handle ADD_ITEM', () => {
    
    // This assertion checks that, when the current state is an empty array and an ADD_ITEM action is dispatched with payload 'item1', the new state will be an array containing 'item1'.
    expect(itemsReducer([], addItem('item1'))).toEqual(['item1']);
  });

  // This test case checks how the itemsReducer handles the DELETE_ITEM action.
  it('should handle DELETE_ITEM', () => {
    
    // This assertion checks that, when the current state is an array with 'item1' and 'item2' and a DELETE_ITEM action is dispatched with payload 'item1', the new state will be an array containing just 'item2'.
    expect(itemsReducer(['item1', 'item2'], deleteItem('item1'))).toEqual(['item2']);
  });

}); // End of 'describe' function

//took help from chatgpt to write tests and comment

//npm install jest --save-dev