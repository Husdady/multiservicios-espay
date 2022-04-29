// Librarys
import Head from "next/head";

// API
import { APP_NAME } from '@api/credentials'

const ProductsHeader = () => {
  return (
    <Head>
      <meta property="og:title" content={APP_NAME} />
      <meta property="og:url" content="https://emprendimientoysalud.com" />
      <meta name="keywords" content="multiservicios espay, Multiservicios Espay, multiservicios-espay, repuestos de motos y carros, negocios paiteños" />
      <meta name="description" content="Multiservicios Espay" />
      <title>Productos | {APP_NAME}</title>
    </Head>
  )
}

export default ProductsHeader;
