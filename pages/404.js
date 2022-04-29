// React
import { Fragment } from 'react'

// Components
import { Button } from '@common'
import Container from "@layouts/common/Container"

// Librarys
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API
import { PUBLIC_URL, APP_NAME } from '@api/credentials'

const robot = require("@assets/img/robot.gif").default.src;

const PageNotFound = () => {
  const router = useRouter()

  // Volver al inicio
  const goToHome = () => {
    return router.replace(PUBLIC_URL)
  }

  return (
    <Fragment>
      <Head>
        <title>Página no encontrada | {APP_NAME}</title>
      </Head>
    
      <Container>
        <div id="page-not-found" className="position-relative h-100vh overflow-hidden">
          <figure className="position-absolute robot left">
            <Image
              width="100%"
              height="100%"
              loading="eager"
              objectFit="cover"
              layout="responsive"
              placeholder="blur"
              src={robot}
              blurDataURL={robot}
            />
          </figure>

          <figure className="position-absolute robot right">
            <Image
              width="100%"
              height="100%"
              loading="eager"
              objectFit="cover"
              layout="responsive"
              placeholder="blur"
              src={robot}
              blurDataURL={robot}
            />
          </figure>
          
          <div className="wrapper position-relative text-center">
            {/* Tipo de error */}
            <h1 className="type-error m-0 fw-bold">404</h1>

            {/* Título */}
            <h3 className="title text-uppercase mb-0">Página no encontrada...</h3>

            {/* Mensaje */}
            <p className="mx-auto my-2">Es posible que la página que está buscando se haya eliminado si se cambió el nombre o no está disponible temporalmente.</p>

            {/* Botón para regresar al inicio */}
            <Button
              icon="home"
              className="go-to-home mt-2 rounded-pill background-effect"
              title="Volver a la página de inicio"
              titleClass="text-uppercase"
              textColor="var(--bs-white)"
              backgroundColor="var(--bg-green)"
              onClick={goToHome}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

export default PageNotFound;
