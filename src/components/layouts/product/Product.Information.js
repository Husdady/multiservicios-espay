// Components
import { Empty } from '@common'

// Librarys
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { nFormatter } from '@utils/Helper'
import { isEmptyArray } from '@utils/Validations'

const emptyBenefitsImage = require('@assets/img/products/empty-benefits.webp').default.src

const ProductInformation = ({ product }) => {
	const totalVisits = nFormatter(product.totalVisits, 1);
	const totalVisitsMessage = totalVisits > 1 ? `${totalVisits} veces` : `${totalVisits} vez`

	return (
		<div className="product-information">
			{/* Total de visitas */}
			<div className="d-flex align-items-center justify-content-end">
				<FontAwesomeIcon icon="eye" className="me-2" />
				<b>Visto {totalVisitsMessage}</b>
			</div>

			{/* Nombre del producto */}
			<h1 className="product-name mb-0 fw-bold text-break text-uppercase">
				{product.name}
			</h1>

			{/* Contenido del producto */}
			<span className="product-content">{product.content}</span>

			{/* Descripción del producto */}
			<p className="product-description mt-2 fw-bold">{product.description}</p>

			{/* Beneficios del producto */}
			<h3 className="title fw-bold text-decoration-underline">Beneficios:</h3>
			<ProductBenefits benefits={product.benefits} />

			{/* Modo de empleo del producto */}
			<h3 className="title fw-bold text-decoration-underline">Modo de empleo:</h3>
			<ProductUsageMode usageMode={product.usageMode} />
		</div>
	)
}

export default ProductInformation

// <------------------------ Extra Components ------------------------>
// Beneficio del producto
const ProductBenefit = ({ benefit }) => {
	return (
		<li className="benefit list mt-2">
			{/*	Icono */}
			<FontAwesomeIcon
				icon="caret-square-right"
				color="var(--bg-darkgreen)"
				className="me-2 arrow-square-right"
			/>

			{/*	Beneficio del producto */}
			<span className="fw-bold">{benefit}</span>
		</li>
	)
}

// Beneficios del producto
const ProductBenefits = ({ benefits }) => {
	// Beneficios vacíos
	const emptyBenefits = isEmptyArray(benefits)

	// emptyBenefitsImage
	if (emptyBenefits) {
		return (
			<Empty
				width={200}
				height={200}
				className="mb-3"
        image={emptyBenefitsImage}
        title="Aún no se han establecido beneficios para este producto..."
        titleStyle={{ maxWidth: 300, textAlign: 'center', lineHeight: 1.25 }}
      />
		)
	}

	return (
		<ul className="benefits ps-0 mb-2">
			{benefits.map((benefit) => <ProductBenefit key={benefit._id} {...benefit} /> )}
		</ul>
	)
}

// Modo de uso del producto
const ProductUsageMode = ({ usageMode }) => {
	return (
		<span className="list">
			{/*	Icono */}
			<FontAwesomeIcon
				icon="caret-square-right"
				color="var(--bg-darkgreen)"
				className="arrow-square-right me-2"
			/>

			<span className="fw-bold">{usageMode}</span>
		</span>
	) 
}