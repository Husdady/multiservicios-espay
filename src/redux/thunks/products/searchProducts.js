// Librarys
import axios from "@api/axios";
import toast from 'react-hot-toast';

// API
import { API_URL } from "@api/credentials";

// TYPES
import {
  UPDATE_PRODUCTS,
  SAVE_PRODUCTS_FILTERS,
  SHOW_LOADING_PRODUCTS,
  HIDE_LOADING_PRODUCTS,
} from '@redux/types'

// Utils
import fragments from '@utils/fragments'
import { stringifyWithoutDoubleQuotes } from "@utils/Helper";

// Buscar productos
export default function searchProducts(value) {
  return async (dispatch, getState) => {
    // Obtener estado de los productos
    const { filters, products } = getState()

    // Destructurar objecto 'filters'
    const { limit } = filters

    // Mostrar loading
    if (!products.loading) {
      dispatch({ type: SHOW_LOADING_PRODUCTS })
    }

    // Graphql query categories: [${stringifyWithoutDoubleQuotes(category)}]
    const query = JSON.stringify({
      query: `query {
        products (pagination: true, skip: 0, limit: ${limit},
          filters: {
            name: "${value}"
        }) {
          ...ProductsFragment
        }}

        ${fragments.products}`
    });

    try {
      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/api/graphql`,
        data: query,
      });

      // Obtener los productos que retorna la API
      const APIProducts = data['data'].products
      console.log('[APIProducts]', APIProducts)
      // Si la API no retorna los productos en formato Array
      if (APIProducts === null) throw true

      // Setear productos
      dispatch({
        type: UPDATE_PRODUCTS,
        products: APIProducts,
        totalProducts: APIProducts.length,
      })

      // Ocultar loading
      dispatch({ type: HIDE_LOADING_PRODUCTS })

      // Guardar valor de búsqueda 
      dispatch({ 
        type: SAVE_PRODUCTS_FILTERS,
        payload: {
          searchValue: value
        }
      })
    } catch(err) {console.log('[err]', err.response)
      const txt =  'A ocurrido un error al buscar los productos'

      // Mostrar error en un mensaje flotante
      toast.error(txt)
    }
  };
}
