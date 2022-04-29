// Librarys
import axios from "@api/axios";

// API
import { API_URL } from "@api/credentials";

// TYPES
import {
  UPDATE_PRODUCTS,
  SHOW_LOADING_PRODUCTS,
  HIDE_LOADING_PRODUCTS,
} from '@redux/types'

// Utils
import fragments from '@utils/fragments'
import { stringifyWithoutDoubleQuotes } from "@utils/Helper";

// Obtener últimos productos por categoría
export default function getAleatoryProducts(category) {
  return async (dispatch, getState) => {
    // Obtener estado de los productos
    const { products } = getState()

    // Mostrar loading
    if (!products.loading) {
      dispatch({ type: SHOW_LOADING_PRODUCTS })
    }

    // Graphql query
    const query = JSON.stringify({
      query: `query {
        products (getAleatoryProducts: true, skip: 0, limit: 20,
          filters: {
            categories: [${stringifyWithoutDoubleQuotes(category)}]
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

      // Setear productos
      dispatch({
        type: UPDATE_PRODUCTS,
        products: APIProducts,
        totalProducts: APIProducts.length,
      })

      // Ocultar loading
      dispatch({ type: HIDE_LOADING_PRODUCTS })
    } catch(err) {
      console.log('[getLastestProductsByCategory.error]', err.response);
    }
  };
}
