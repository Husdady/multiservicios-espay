// Librarys
import axios from "@api/axios";
import toast from 'react-hot-toast';

// API
import { API_URL } from "@api/credentials";

// Utils
import { isEmptyArray } from "@utils/Validations";

export default async function getCategories(extraData) {
  const {
    args,
    setCategories,
    activeCategory,
    setActiveCategory,
  } = extraData

  // Graphql query
  const query = JSON.stringify({
    query: `query {
      categories(limit: ${args.limit}, getLastestCategories: ${args.getLastestCategories}) {
        _id
        name
      }
    }`,
  });

  try {
    const { data } = await axios({
      method: "POST",
      url: `${API_URL}/api/graphql`,
      data: query,
    });

    // Obtener categorías de productos
    const APICategories = data["data"].categories;

    // Si el servidor no trae las categorías en formato Array
    if (APICategories === null) {
    	throw new Error('A ocurrido un error para obtener las categorías')
    }

    // Setear categorías de los productos
    setCategories(APICategories)

    // Obtener la primera categoría en caso 'activeCategory' sea null, sino lo es, obtener el valor de la categoría activa 
    const category = !activeCategory ? APICategories[0] : activeCategory

    // Setear una categoría activa
    setActiveCategory(category)
  } catch (err) {
    // Mostrar mensaje de error por consola
    console.error('[getCategories.error]', err.response);

    // Mostrar error por pantalla 
    toast.error(err.message)
  }
}
