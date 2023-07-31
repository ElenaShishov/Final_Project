// store.ts

import { createStore, combineReducers } from "redux";
import userReducer from "./UserReducer";
import { vacationReducer } from "./VacationReducer";


const rootReducer = combineReducers({
  user: userReducer,
  vacation: vacationReducer,

  // Add other reducers here if needed
});

const store = createStore(rootReducer);

export default store;
