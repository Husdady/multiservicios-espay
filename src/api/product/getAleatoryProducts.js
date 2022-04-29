// Librarys
import axios from "@api/axios";
import toast from 'react-hot-toast';

// API
import { API_URL } from "@api/credentials";

// Utils
import fragments from '@utils/fragments'

export default async function getAleatoryProducts(extraData) {
	try {console.log('[getAleatoryProducts]')
    // Mostrar "skeletons" en productos aleatorios
    extraData?.showLoading();

		// GraphQL query
    const query = JSON.stringify({
      query: `query {
	     	products(getAleatoryProducts: true, limit: 20, filters: {
	        name: "${extraData.productToExclude}"
	      }) {
	        ...ProductsFragment
	      }}

	      ${fragments.products}`,
    });

    const { data } = await axios({
      method: "POST",
      url: `${API_URL}/api/graphql`,
      data: query,
    });

    // Obtener productos
    const APIProducts = data["data"].products;

    // Si los productos traidos de la API no están en formato 'Array'
    if (APIProducts === null) throw true


  	// Setear productos
  	extraData?.setAleatoryProducts(APIProducts)

  	// Ocultar loading
  	setTimeout(extraData?.hideLoading, 2000);
	} catch(err) {
		// Mostrar error por consola
		console.error(`[getAleatoryProducts.error]`, err.response);

		toast.error('A ocurrido un error al obtener los productos aleatoriamente')
	}
}