import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'
import {productReducer} from "./reducers/product/productReducer";
import {snackBarReducer} from "./reducers/snackBar/snackBarReducer";
import {productDetailsReducer} from "./reducers/productDetails/productDetails";
import {userReducer} from "./reducers/user/user-reducer";


const rootReducers = combineReducers({
    products:productReducer,
    snackBar:snackBarReducer,
    productDetails:productDetailsReducer,
    user:userReducer
});


export const store = createStore(rootReducers,composeWithDevTools(applyMiddleware(thunk)));
