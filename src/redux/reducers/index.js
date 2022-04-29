// Librarys
import { combineReducers } from "redux";

// Reducers
import filters from "./filters";
import products from "./products";

// Definir reducers
const reducers = combineReducers({
  filters: filters,
  products: products
});

export default reducers;
