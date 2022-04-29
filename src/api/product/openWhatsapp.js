// Librarys
import toast from 'react-hot-toast';

// API
import axios from '@api/axios'
import { APP_NAME, API_URL } from '@api/credentials'

// GraphQL query
const query = JSON.stringify({
	query: `
		query {
			contact {
				phone
			}
		}
	`
})

// Abrir Whatsapp
export default async function openWhatsapp(product, externalLink) {
	try {
		// Mensaje de Whatsapp
		const message = `Hola @${APP_NAME}, he visto el producto "${product.name}" en ${externalLink} y me interesa adquirirlo.`;

		// Convertir espacios vacíos ' ' en '%20'
		const wspMessage = message.split(" ").join("%20");

		const { data } = await axios({
			method: "POST",
			url: `${API_URL}/api/graphql`,
			data: query,
		})

		// Obtener el número de la distribuidora
		const { phone } = data['data'].contact

		// Enlace de Whatsapp
		const link = `https://api.whatsapp.com/send?phone=${phone}&text=${wspMessage}`

		// Abrir Whatsapp
		window.open(link, "_blank");
	} catch(err) {
		// Mostrar mensaje de error por consola
    console.error(err.response)

    // Mostrar mensaje de error por pantalla
    toast.error("A ocurrido al abrir el Whatsapp para enviar un mensaje")
	}
}