// reducers/index.js
import { combineReducers } from 'redux';
// Import other reducers here
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // Add other reducers here
  user: userReducer,
});

export default rootReducer;
