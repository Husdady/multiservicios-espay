// React
import { useCallback, useMemo } from 'react'

// Components
import { Button } from '@common'

// Librarys
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API
import { APP_NAME } from '@api/credentials'
import { openWhatsapp } from '@api/product'

// Utils
import { isArray } from '@utils/Validations'

const ProductImages = ({ product }) => {
	// Evento 'click' en botón que abre Whatsapp
	const handleOpenWhatsapp = useCallback(() => {
		const externalLink = `${APP_NAME}/productos/${product.name}`

		// Abrir Whatsapp de la distribuidora
		openWhatsapp({
			product: product,
			externalLink: externalLink
		})
	}, [product])

	return (
		<div className="product-images">
			{/* Imágenes del producto */}
			<Images data={product.images} />

			{/* Botón 'contactar distribuidora' */}
			<Button
				icon={["fab", "whatsapp"]}
				onClick={handleOpenWhatsapp}
				title="Contactar distribuidora"
				textColor="var(--bs-white)"
				backgroundColor="var(--bg-darkgreen)"
				className="contact-distributor d-block mx-auto mb-3 py-3 rounded-pill opacity"
			/>
				
			{/* Nota */}
			<span className="note">NOTA: Por favor contáctate con la distribuidora para recibir asesoramiento. Evita solicitar un producto sin antes saber los beneficios y el uso de cada producto.</span>
		</div>
	)
}

export default ProductImages

const arrowStyle = {
  top: "50%",
	zIndex: 999,
}

// <------------------------ Extra Components ------------------------>
const Images = ({ data }) => {
	// Sólo existe una imagen
	const isOnlyImage = useMemo(() => data.length === 1, [])

  // Renderizar flecha "<-----"
  const renderArrowPrev = useCallback((decrement) => {
    if (isOnlyImage) return;

    return (
      <FontAwesomeIcon
        size="2x"
        role="button"
        id="arrow-circle-left"
        icon="arrow-circle-left"
        color="var(--bg-darkgreen)"
        className="position-absolute start-0"
        style={arrowStyle}
        onClick={decrement}
      />
    )
  }, [])

  // Renderizar flecha "----->"
  const renderArrowNext = useCallback((increment) => {
    if (isOnlyImage) return;

    return (
      <FontAwesomeIcon
        size="2x"
        role="button"
        id="arrow-circle-right"
        icon="arrow-circle-right"
        color="var(--bg-darkgreen)"
        className="position-absolute end-0"
        style={arrowStyle}
        onClick={increment}
      />
    )
  }, [])

  // Renderizar imágenes
  const renderImages = useMemo(() => {
  	// Imágenes no están en formato 'Array'
  	const invalidData = !isArray(data)

  	if (invalidData) return

    return data.map((image, i) => (
      <div
        key={i}
        className="product-image"
        style={{ backgroundImage: `url(${image.url})` }}
      >
        <img
          src={image.url}
          width={image.width}
          height={image.height}
          className="h-100"
          loading="lazy"
        />
      </div>
      
    ))
  }, [data])

  return (
    <Carousel
      infiniteLoop
      showStatus={false}
      stopOnHover={false}
      showThumbs={!isOnlyImage}
      showIndicators={!isOnlyImage}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
    >
      {renderImages}
    </Carousel>
  );
}
