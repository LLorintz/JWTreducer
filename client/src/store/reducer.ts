// Állapot kezdeti értéke
const initialState = {
    isLoggedIn: false,
  };
  
  // Reducer függvény
  const reducer = (state = initialState, action: { type: string }) => {
    switch (action.type) {
      case 'ON_LOGGED_IN':
        return {
          ...state,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default reducer;