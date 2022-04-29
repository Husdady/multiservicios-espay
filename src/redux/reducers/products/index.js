// TYPES
import * as types from '@redux/types'

const initialState = {
	items: [],
	totalItems: 0,
	loading: true,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    // Mostrar cargando de productos
    case types.SHOW_LOADING_PRODUCTS:
      return {
      	...state,
      	loading: true
      };

    // Ocultar cargando de productos
    case types.HIDE_LOADING_PRODUCTS:
      return {
      	...state,
      	loading: false
      };

    // Actualizar productos
    case types.UPDATE_PRODUCTS:
      return {
      	...state,
      	items: action.products,
      	totalItems: action.totalProducts,
      };

    // Añadir más productos
    case types.ADD_MORE_PRODUCTS:
      return {
        ...state,
        items: [...state.items, ...action.products],
        totalItems: state.totalProducts + action.products.length,
      };  
      
    default:
      return state;
  }
}

// Obtener el estado del reducer
export const getProductsState = ({ products }) => ({ products }) 
export default products;
