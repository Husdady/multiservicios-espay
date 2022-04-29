// React
import { Fragment, useCallback } from 'react';

// Components
import { Button } from "@common";

// Librarys
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';

// API
import { PUBLIC_URL, APP_NAME } from '@api/credentials'

const productNotFoundImage = require("@assets/img/products/empty-product.webp").default

const ProductNotFound = ({ buttonIcon, buttonTitle }) => {
  const router = useRouter()

  // Redireccionar a la sección de productos
  const onRedirectToProductsSection = useCallback(() => {
    router.replace(`${PUBLIC_URL}/productos`);
  }, [])

  return (
    <Fragment>
      {/* Head */}
      <Head>
        <title>Producto no encontrado | {APP_NAME}</title>
      </Head>

      <div className="product-not-found d-flex justify-content-center flex-column align-items-center mb-2 mx-auto pb-5">
        {/* Imagen */}
        <figure>
          <Image
            width={400}
            height={400}
            loading="eager"
            objectFit="cover"
            placeholder="blur"
            layout="responsive"
            alt="product-not-found-image"
            src={productNotFoundImage.src}
            blurDataURL={productNotFoundImage.src}
          />
        </figure>
        
        {/* Mensaje */}
        <h2 className="title text-center fw-bold mx-auto mb-0">Lo sentimos, el producto que estás buscando no existe!</h2>

        {/* Botón 'Volver a la sección que muestra los productos' */}
        <Button
          icon={buttonIcon}
          title={buttonTitle}
          titleClass="ps-1"
          textColor="var(--bs-white)"
          backgroundColor="var(--bg-green)"
          className="scale go-to-products-sections px-5 py-3 rounded-pill opacity"
          onClick={onRedirectToProductsSection}
        />
      </div>
    </Fragment>
  );
}

export default ProductNotFound;

Button.propTypes = {
  buttonTitle: PropTypes.string,
  buttonIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
}
