import { combineReducers } from "redux";
import cart from "./cart"
import products from "./product"
import offerings from "./offerings"


export default combineReducers({ cart,products,offerings });
