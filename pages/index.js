// React
import { Fragment } from 'react'

// Components
import Container from "@root/src/components/layouts/common/Container"
import Presentation from "@root/src/components/layouts/home/Home.Presentation"

// Librarys
import dynamic from "next/dynamic";

// Headers
import { HomeHeader } from "@headers";

const Benefits = dynamic(() => import("@root/src/components/layouts/home/Home.Benefits"));
const AboutProducts = dynamic(() => import("@root/src/components/layouts/home/Home.AboutProducts"));
const HomeProducts = dynamic(() => import("@root/src/components/layouts/home/Home.Products"));
const HomeLocation = dynamic(() => import("@root/src/components/layouts/home/Home.Location"), { ssr: false });

const HomePage = () => {
  return (
    <Fragment>
      {/* Head */}
      <HomeHeader />

      <Container>
        <div className="tm-home">
          {/* Presentación */}
          <Presentation />

          {/* Beneficios */}
          <Benefits />

          {/* Acerca de los productos */}
          <AboutProducts />

          {/* Productos */}
          <HomeProducts />

          {/* Ubicación del negocio */}
          <HomeLocation />
        </div>
      </Container>
    </Fragment>
  )
}

export default HomePage;
