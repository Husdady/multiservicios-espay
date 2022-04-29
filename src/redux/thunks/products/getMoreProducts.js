// Librarys
import axios from "@api/axios";
import toast from 'react-hot-toast';

// API
import { API_URL } from "@api/credentials";

// TYPES
import { ADD_MORE_PRODUCTS } from '@redux/types'

// Utils
import fragments from '@utils/fragments'
import { isEmptyArray, isEmptyString } from '@utils/Validations'
import { stringifyWithoutDoubleQuotes } from "@utils/Helper";

// Obtener más productos
export default function getMoreProducts({ skip, skipMore, showLoading, hideLoading, hideLoadMoreButton }) {
  return async (dispatch, getState) => {
    // Obtener estado de los productos
    const { filters, products } = getState()

    // Destructurar objecto 'filters'
    const { limit, searchValue, activeCategory } = filters

    // Obtener el nombre del producto guardado en la búsqueda
    const productName = !isEmptyString(searchValue) ? JSON.stringify(searchValue) : null

    // Graphql query
    const query = JSON.stringify({
      query: `query {
        products (pagination: true, skip: ${skip}, limit: ${limit},
          filters: {
            name: ${productName}
            categories: [${stringifyWithoutDoubleQuotes(activeCategory._id)}]
        }) {
          ...ProductsFragment
        }}

        ${fragments.products}`
    });

    try {
    	// Mostrar loading en botón
    	showLoading()

      const { data } = await axios({
        method: "POST",
        url: `${API_URL}/api/graphql`,
        data: query,
      });

      // Obtener los productos que retorna la API
      const APIProducts = data['data'].products

      // Si el servidor no trae los productos en formato Array
      if (APIProducts === null) {
        throw new Error('A ocurrido un error al cargar más productos')
      }

      // Productos vacíos
      const emptyProducts = isEmptyArray(APIProducts)
      // console.log('[APIProducts]', skip)
      if (emptyProducts) {
      	toast.success(`Todos los productos con la categoría "${activeCategory.name}" han sido cargados correctamente`)

      	return hideLoadMoreButton()
      }

      // Aumentar 'skip'
      skipMore()

      // Setear productos
      dispatch({
        type: ADD_MORE_PRODUCTS,
        products: APIProducts,
        totalProducts: APIProducts.length,
      })

      // Ocultar loading en botón
    	hideLoading()
    } catch(err) {
    	// Ocultar loading en botón
    	hideLoading()

    	// Mostrar mensaje de error por consola
      console.error('[getMoreProducts.error]', err.response);

      // Mostrar error por pantalla
      toast.error(err.message)
    }
  };
}
