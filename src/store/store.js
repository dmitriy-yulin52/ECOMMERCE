import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'
import {productReducer} from "./reducers/product/productReducer";
import {snackBarReducer} from "./reducers/snackBar/snackBarReducer";
import {productDetailsReducer} from "./reducers/productDetails/productDetails";
import {userReducer} from "./reducers/user/user-reducer";
import {profileReducer} from "./reducers/user/profile-reducer";
import {forgotPasswordReducer} from "./reducers/user/forgotPasswordReducer";
import {allUsersReducer} from "./reducers/user/allUserReducer";
import {userDetailsReducer} from "./reducers/user/userDetailsReducer";
import {cartReducer} from "./reducers/cart/cart-reducer";


const rootReducers = combineReducers({
    products:productReducer,
    snackBar:snackBarReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    cart:cartReducer
});


export const store = createStore(rootReducers,composeWithDevTools(applyMiddleware(thunk)));
