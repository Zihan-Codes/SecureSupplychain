// store.js
import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if you have more
});

const store = createStore(rootReducer);

export default store;
