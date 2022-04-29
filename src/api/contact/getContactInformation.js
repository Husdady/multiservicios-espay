// Librarys
import toast from 'react-hot-toast';

// API
import axios from '@api/axios'
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'
import { isFunction } from '@utils/Validations'

// Obtener información de contacto
export default async function getContactInformation({ setContactInformation }) {
	try {
		// Graphql query
    const query = JSON.stringify({
      query: `query {
        contact {
          ...ContactFragment
      }}

      ${fragments.contact}`,
    });

		const { data } = await axios({
			method: 'POST',
			url: `${API_URL}/api/graphql`,
			data: query,
		})

		// Obtener la información de contacto de la API
		const APIContactInformation = data['data'].contact

		// Si la API no retorna los productos en formato Array
    if (APIContactInformation === null) {
      throw new Error('A ocurrido un error al cargar la información de contacto.')
    }
    
    // Si 'setContactInformation' es una función, ejecutarla
		if (isFunction(setContactInformation)) {
			setContactInformation(APIContactInformation)
		}
	} catch(err) {
		// Mostrar mensaje de error por consola
    console.error('[getContactInformation.error]', err.response);

		const txt =  'A ocurrido un error al obtener la información de contacto, inténtelo más tarde'

		// Mostrar error en un mensaje flotante
		toast.error(txt)
	}
}
