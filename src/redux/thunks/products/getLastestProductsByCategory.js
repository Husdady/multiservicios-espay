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
import { stringifyWithoutDoubleQuotes } from "@utils/Helper";

// Obtener últimos productos por categoría
export default function getLastestProductsByCategory() {
  return async (dispatch, getState) => {
    // Obtener estado de los productos
    const { filters, products } = getState()

    // Obtener la categoría activa
    const { activeCategory } = filters

    // Mostrar loading
    if (!products.loading) {
      dispatch({ type: SHOW_LOADING_PRODUCTS })
    }

    // Graphql query
    const query = JSON.stringify({
      query: `query {
        products (getLastestProducts: true, skip: 0, limit: 8,
          filters: {
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
        throw new Error(`A ocurrido un error para obtener los productos con la categoría "${activeCategory.name}"`)
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
      console.log('[getLastestProductsByCategory.error]', err.response);

      // Mostrar error por pantalla
      toast.error(err.message)
    }
  };
}
