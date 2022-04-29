// Librarys
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faCar, faCarBattery, faCog, faHardHat, faMotorcycle, faOilCan, faWrench, faScrewdriver } from "@fortawesome/free-solid-svg-icons";

const HomeBeneftis = () => {
  const benefits = [
    { icon: faMotorcycle, title: "Mejora tu moto con nuestros productos" },
    { icon: faCog, title: "Todo tipo de herramientas para carros y motos" },
    { icon: faCarBattery, title: "Baterías con un buen rendimiento para tu carro" },
    { icon: faHardHat, title: "Cascos para protegerte cuando manejes" },
    { icon: faWrench, title: "Repara tu carro con nuestro servicio" },
    { icon: faLightbulb, title: "Luces para que no te pierdas de noche" },
    { icon: faScrewdriver, title: "Repara tu moto con nuestro servicio" },
    { icon: faOilCan, title: "Aceites para que tu carro siempre este reluciente" },
    { icon: faCar, title: "Mantenimiento para tu carro" },
  ]
  const renderBenefits = () => {
    return benefits.map((benefit, i) => (
      <Col key={i} lg={3} md={4} sm={5} xs={10} className="p-0 m-1">
        <Benefit {...benefit} />
      </Col>
    ));
  }

  return (
    <section id="benefits" className="position-relative d-flex align-items-center">
      <div className="wrap position-absolute top-0 start-0 bottom-0 end-0" />
      <div className="container fluid position-relative">
        <Row className="flex-wrap align-items-center justify-content-center">
          {renderBenefits()}
        </Row>
      </div>
    </section>
  );
}

export default HomeBeneftis;

// <------------------------ Extra Components ------------------------>
const Benefit = ({ icon, title }) => {
  return (
    <article className="benefit px-4 py-2 rounded-3 d-flex align-items-center">
      <FontAwesomeIcon icon={icon} size="lg" className="me-2" />
      <h3 className="fw-bold title fs-6 mb-0">{title}</h3>
    </article>
  )
}