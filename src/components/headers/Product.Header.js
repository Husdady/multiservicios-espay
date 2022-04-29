// Librarys
import Head from "next/head";

// API
import { APP_NAME } from '@api/credentials'

const ProductHeader = (product) => {
	const pageTitle = `${product.name} | ${APP_NAME}`

  return (
    <Head>
      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={window.location.href} />
      <meta name="keywords" content="productos multiservicios espay, Multiservicios Espay, multiservicios-espay, repuestos de motos y carros, negocios paiteños" />
      <meta name="description" content={product.description} />
      <title>{pageTitle}</title>
    </Head>
  )
}

export default ProductHeader;
