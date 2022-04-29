// React
import { Fragment, useEffect } from 'react'

// Components
import Container from "@layouts/common/Container"
import AppName from "@layouts/common/AppName"
import Search from "@root/src/components/layouts/products/Products.Search"
import Products from "@root/src/components/layouts/products"

// Headers
import { ProductsHeader } from '@headers'

// Utils
import { scrollToSection } from '@utils/Helper'

const ProductsPage = () => {
  return (
  	<Fragment>
  		{/* Head */}
  		<ProductsHeader />

	    <Container>
	      <Content />
	    </Container>
    </Fragment>
  )
}

export default ProductsPage;

// <------------------------ Extra Components ------------------------>
const Content = () => {
	// Realizar scroll hacia abajo cuando se monta el componente
	useEffect(() => {
		scrollToSection('shortcut-01joa')
	}, [])

	return (
		<section className="py-5 shortcut-01joa">
    	{/* Nombre de la app */}
      <AppName titleClass="ms-2" className="d-flex align-items-center flex-wrap justify-content-center mb-3" />
      
    	{/* Buscador */}
      <Search />

    	{/* Productos */}
      <Products className="mt-5" />
    </section>
	)
}
