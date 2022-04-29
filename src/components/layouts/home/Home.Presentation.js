// React
import { useEffect } from 'react';

// Components
import { Button } from "@common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Librarys
import Image from "next/image";
import { useRouter } from "next/router";
import { Row, Col, Carousel } from "react-bootstrap";

// Utils
import { scrollToSection } from "@utils/Helper";

const thumbnail01 = require("@assets/img/home/thumbnail-01.webp").default.src;
const thumbnail02 = require("@assets/img/home/thumbnail-02.webp").default.src;
const thumbnail03 = require("@assets/img/home/thumbnail-03.webp").default.src;

const Presentation = () => {
  const items = [
    {
      image: thumbnail01,
      link: "/productos",
      buttonTitle: "Ver todos los productos",
      title: "Lorem ipsum dolor sit amet distinctio omnis qui eaque.",
      description: "Lorem ipsum dolor sit amet. Ad distinctio omnis qui eaque quisquam At harum assumenda et fugit deserunt et quia nostrum et quis amet ut laboriosam magni. ",
    },
    {
      image: thumbnail03,
      isExternalLink: true,
      link: "https://www.facebook.com/Espay31",
      buttonTitle: "Visitar página",
      title: "Siguenos en nuestra página oficial de Facebook.",
      description: "Lorem ipsum dolor sit amet. Ad distinctio omnis qui eaque quisquam At harum assumenda et fugit deserunt et quia nostrum et quis amet ut laboriosam magni. ",
    },
    {
      image: thumbnail02,
      link: "/contacto",
      buttonTitle: "Contactar",
      title: "¿Deseas contactar con Multiservicios ESPAY?",
      description: "Lorem ipsum dolor sit amet. Ad distinctio omnis qui eaque quisquam At harum assumenda et fugit deserunt et quia nostrum et quis amet ut laboriosam magni. ",
    }
  ]

  const renderCarouselItems = () => {
    return items.map((item, i) => (
      <Carousel.Item key={i}>
        <Item {...item} index={i} />
      </Carousel.Item>
    ))
  }

  // Realizar scroll hacia abajo cuando se monta el componente
  useEffect(() => {
    scrollToSection('shortcut-e1j9d')
  }, [])

  return (
    <section id="presentation" className="shortcut-e1j9d">
      <Carousel
        prevIcon={<FontAwesomeIcon icon='angle-left' color="var(--bg-darkgreen" size="4x" className="scale" />}
        nextIcon={<FontAwesomeIcon icon='angle-right' color="var(--bg-darkgreen" size="4x" className="scale" />}
      >
        {renderCarouselItems()}
      </Carousel>
    </section>
  );
};

export default Presentation;

// <------------------------ Extra Components ------------------------>
const Item = ({ title, description, image, buttonTitle, link, isExternalLink, index }) => {
  const router = useRouter();

  const navigate = () => {
    if (isExternalLink) {
      return window.open(link);
    }

    return router.push(link);
  }

  return (
    <div className="position-relative container fluid py-2 px-xxl-5">
        <Row className="tm-home-section align-items-center">
          <Col as="aside" md={12} lg={6} xxl={7}>
            <h1 className="tm-home-title fw-bold">{title}</h1>
            <span className="d-block text-muted mb-2">{description}</span>
            <Button
              title={buttonTitle}
              className="mt-2 py-3 px-5 text-white"
              backgroundColor="var(--bg-darkgreen)"
              onClick={navigate}
            />
          </Col>

          <Col
            as="aside"
            lg={6}
            xxl={5}
            className={`d-flex justify-content-center thumbnail-${index}`}
          >
            <Image objectFit="contain" src={image} width={580} height={430} />
          </Col>
        </Row>
      </div>
  )
}