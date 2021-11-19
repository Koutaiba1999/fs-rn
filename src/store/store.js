import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //for asynchronous actions
import { composeWithDevTools } from "redux-devtools-extension";


import authReducer from "./auth";
import stocksReducer from "./stocks";


// c'est pour combiner les deux store authState et stockState
const rootReducer = combineReducers({
  
    authState: authReducer,
    stockState: stocksReducer,
    
    
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;