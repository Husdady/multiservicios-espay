// Librarys
import axios from "@api/axios";
import toast from 'react-hot-toast';

// API
import { API_URL } from "@api/credentials";

// Utils
import fragments from '@utils/fragments'

// Obtener información de un producto
export default async function getProductInformation(extraData) {
  const { product } = extraData

	try {
		// GraphQL query
    const query = JSON.stringify({
      query: `query {
      	product (name: "${product}") {
          ...ProductFragment
      }}

      ${fragments.product}`
    });

    const { data } = await axios({
      method: "POST",
      url: `${API_URL}/api/graphql`,
      data: query,
    });

    // Obtener productos
    const APIProduct = data["data"].product;

    // Setear información de producto
    extraData.setProductInformation(APIProduct);
	} catch(err) {
    // Mostrar error por consola
		console.log(`[getProductInformation.error]`, err.response);

    // Mostrar error por pantalla
    toast.error(`No se ha encontrado el producto con el nombre: "${product}"`);
	}

  // Ocultar loading
  extraData.hideLoading();
}