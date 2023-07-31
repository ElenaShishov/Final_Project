const initialState = {
    user_name: "",
    user_type: "",
  };
  
  const SET_USER = "SET_USER";
  
  export const setUser = (user: { user_name: string; user_type: string }) => ({
    type: SET_USER,
    payload: user,
  });
  
  const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SET_USER:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  