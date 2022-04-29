// React
import { Fragment, useEffect, useState, useCallback, useMemo } from 'react'

// Components
import Container from "@layouts/common/Container";
import Loading from "@layouts/loaders/Loading.Preload"
import ProductImages from "@layouts/product/Product.Images";
import ProductInformation from "@layouts/product/Product.Information";
import ProductNotFound from "@layouts/product/Product.NotFound";
import AleatoryProducts from "@layouts/products/Products.Aleatory";

// Librarys
import Head from "next/head";
import { useRouter } from 'next/router'

// Headers
import { ProductHeader } from "@headers";

// API
import { getProductInformation } from '@api/product'

// Utils
import { scrollToSection } from "@utils/Helper";
import { isEmptyObject } from "@utils/Validations";

const color = "var(--bg-darkgreen)"

const ProductPage = () => {
	const router = useRouter()
	const [product, setProduct] = useState({})
	const [isLoading, setLoading] = useState(true)

	// Producto a excluir de productos aleatorios
	const productToExclude = useMemo(() => {
		return product.name ?? router.query.product
	}, [isLoading])

	// Obtener el nombre del producto
	const productQuery = useMemo(() => {
		return router.query?.product.replace(/\-/g, " ");
	}, []) 

	// Ocultar loading
	const hideLoading = useCallback(() => { setLoading(false) }, [])

	// Setear información del producto
	const setProductInformation = useCallback((productInformation) => {
		if (!productInformation) return;

		setProduct(productInformation)
	}, [])

	// Evento que se ejecuta cuando se monta el componente
	const onMount = useCallback(() => {
		const emptyQuery = isEmptyObject(router.query);

		// Si no existen queries en el 'router', finalizar función
		if (emptyQuery) return;

		// Obtener información del producto cuando se carga el componente 
		getProductInformation({
			product: productQuery,
			hideLoading: hideLoading,
			setProductInformation: setProductInformation,
		})
	}, [])

	// Renderizar producto
	const renderProduct = useMemo(() => {
		// Está cargando la información del producto
		if (isLoading) {
			return <LoadingProduct />
		};

		// Si es producto vacío es porque no existe
		const emptyProduct = isEmptyObject(product)

		if (emptyProduct) {
			return (
				<ProductNotFound
					buttonIcon="boxes"
					buttonTitle="Volver a la sección de los productos"
				/>
			)
		}

		return (
			<Fragment>
				{/* Head */}
				<ProductHeader {...product} />

				{/* Imágenes del producto */}
				<ProductImages product={product} />

				{/* Información del producto */}
				<ProductInformation product={product} />
			</Fragment>
		)
	}, [isLoading, product])
	
	useEffect(() => {
		onMount()
	}, [])

  return (
    <Container needRenderAgain={isLoading}>
      <Content>
      	{renderProduct}
      </Content>

			<div className="mx-4">
				<h4 className="fw-bold subtitle" style={{ color }}>
					También te puede interesar:
				</h4>

				{/* Productos aleatorios */}
				<AleatoryProducts className="pt-2 pb-4 px-2 mb-4" productToExclude={productToExclude} />
			</div>
    </Container>
  )
}

export default ProductPage;

// <------------------------ Extra Components ------------------------>
const Content = ({ children }) => {
	// Realizar scroll hacia abajo cuando se monta el componente
  useEffect(() => {
    scrollToSection('shortcut-ia91h')
  }, [])

	return (
		<section className="container-product information d-flex flex-wrap mt-5 mb-4 mx-auto overflow-hidden shortcut-ia91h">
				{children}
			</section>
	)
}
const LoadingProduct = () => {
	return (
		<Fragment>
			<Head>
      	<title>Cargando producto...</title>
    	</Head>

    	{/*<Loading />	*/}
    	<Loading />
		</Fragment>
	)
}
