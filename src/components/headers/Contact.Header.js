// React
import { Component } from "react";

// Librarys
import Head from "next/head";

// API
import { APP_NAME } from '@api/credentials'

const ContactHeader = () => {
	const pageTitle = `Contacto | ${APP_NAME}`;

	return (
		<Head>
			<meta property="og:title" content={pageTitle} />
			<meta property="og:url" content="https://emprendimientoysalud.com/contacto" />
			<meta name="keywords" content="contacto emprendimientoysalud, Contacto emprendimiento y salud, Yessica Milagros, Emprendimiento y salud, emprendimiento-y-salud, Omnilife, omnilife, Seytu, seytu, Seytú, seytú, salud y belleza" />
			<meta name="description" content="Información de contacto - Emprendimiento y Salud, contacta con nuestra distribuidora independiente Yessica Milagros para adquirir productos Omnilife y Seytú." />
      <title>{pageTitle}</title>
    </Head>
	)
}

export default ContactHeader
