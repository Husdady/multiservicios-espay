// Librarys
import toast from 'react-hot-toast';

// API
import axios from "@api/axios";
import { API_URL } from '@api/credentials';

// Enviar mensaje de contacto por correo electrónico
export default async function sendEmailMessage({ values, resetForm, extraData }) {
  try {
    // Mostrar loading en botón
    extraData.showLoading()

    const res = await axios({
      method: 'POST',
      url: `${API_URL}/api/contact/sendMessage`,
      data: values,
    })
    
    // Mostrar mensaje por pantalla
    toast.success("Hemos recibido tu mensaje, gracias por escribirnos, te contestaremos pronto")
  } catch (err) {
    // Mostrar mensaje de error por consola
    console.error(err.response)

    // Mostrar mensaje de error por pantalla
    toast.error("A ocurrido un error al enviar tu mensaje")
  }

  // Ocultar loading en botón
  extraData.hideLoading()

  // Resetear formulario
  resetForm()
}