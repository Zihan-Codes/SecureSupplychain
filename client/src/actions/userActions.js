// actions/userActions.js
export const setUser = (userId, username) => {
    return {
      type: 'SET_USER',
      payload: { userId, username },
    };
  };
  
  export const clearUser = () => {
    return {
      type: 'CLEAR_USER',
    };
  };
  