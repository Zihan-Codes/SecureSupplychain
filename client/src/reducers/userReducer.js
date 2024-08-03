// reducers/userReducer.js
const initialState = {
    userId: '',
    username: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          userId: action.payload.userId,
          username: action.payload.username,
        };
      case 'CLEAR_USER':
        return {
          ...state,
          userId: '',
          username: '',
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  