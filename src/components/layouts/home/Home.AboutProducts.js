// Librarys
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutProducts = () => {
  return (
    <section className="tm-about-products pt-5 px-5 pb-0 pb-sm-5 position-relative">
      <div className="d-flex flex-wrap align-items-center justify-content-center mb-3">
        <FontAwesomeIcon icon="boxes" size="2x" className="me-2 boxes" color="var(--bg-darkgreen)" />
        <h2 className="fw-bold mb-0 title text-center">Nuestros productos</h2>
      </div>
      <span className="d-block text-center description mx-auto">Lorem ipsum dolor sit amet. Aut rerum nemo aut optio harum vel numquam quasi. Et voluptatem explicabo ab veritatis magni ex velit voluptates qui temporibus obcaecati qui atque facilis.</span>
    </section>
  )
}

export default AboutProducts;
