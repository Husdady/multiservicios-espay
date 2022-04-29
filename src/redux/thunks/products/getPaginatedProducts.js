// Librarys
import axios from "@api/axios";
import toast from 'react-hot-toast';

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
import { isEmptyString } from '@utils/Validations'
import { stringifyWithoutDoubleQuotes } from "@utils/Helper";

// Paginar productos
export default function getPaginatedProducts() {
  return async (dispatch, getState) => {
    // Obtener estado de los productos
    const { filters, products } = getState()

    // Destructurar objecto 'filters'
    const { limit, searchValue, activeCategory } = filters

    // Mostrar loading
    if (!products.loading) {
      dispatch({ type: SHOW_LOADING_PRODUCTS })
    }

    // Obtener el nombre del producto guardado en la búsqueda
    const productName = !isEmptyString(searchValue) ? JSON.stringify(searchValue) : null

    // Graphql query
    const query = JSON.stringify({
      query: `query {
        products (pagination: true, skip: 0, limit: ${limit},
          filters: {
            name: ${productName}
            categories: [${stringifyWithoutDoubleQuotes(activeCategory._id)}]
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

      // Si el servidor no trae los productos en formato Array
      if (APIProducts === null) {
        throw new Error('A ocurrido un error para obtener los productos')
      }

      // Setear productos
      dispatch({
        type: UPDATE_PRODUCTS,
        products: APIProducts,
        totalProducts: APIProducts.length,
      })

      // Ocultar loading
      dispatch({ type: HIDE_LOADING_PRODUCTS })
    } catch(err) {
      // Mostrar mensaje de error por consola
      console.log('[getPaginatedProducts.error]', err.response);

      // Mostrar error por pantalla
      toast.error(err.message)
    }
  };
}
