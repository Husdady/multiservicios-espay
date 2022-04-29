// React
import { useEffect, useMemo } from "react";

// Components
import { Empty } from '@common'
import Loading from '@layouts/loaders/Loading.Preload'

// Librarys
import dynamic from "next/dynamic";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'

// Actions
import getProductsActions from '@redux/actions/products'

// Reducers
import { getProductsState } from '@redux/reducers/products'

// Utils
import { classnames } from '@utils/Helper'
import { isEmptyArray } from '@utils/Validations'

const Product = dynamic(() => import("./Products.Item"));
const emptyProductsImage = require('@assets/img/products/empty-products.webp').default.src

const loadingStyle = {
  height: 300
}

const ProductsLastest = () => {
	const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const activeCategory = useSelector((state) => state.filters.activeCategory)

  // Destructurar 'products'
  const { items, loading } = products

  // Renderizar productos
  const renderProducts = useMemo(() => {
    return products.items.map((product, i) => (
      <Col key={i} lg={3} md={4} sm={6} className="p-2 container-product">
        <Product {...product} />
      </Col>
    ))
  }, [products]);
  
  useEffect(() => {
  	if (!activeCategory) return

  	// Extraer acción
  	const { getLastestProductsByCategory } = getProductsActions(dispatch)

  	// Obtener los últimos productos por una categoría cuando se renderiza el componente
  	getLastestProductsByCategory()
  }, [activeCategory])

  // Comprobar si están cargando los productos
  if (loading) {
    return <Loading style={loadingStyle} title={null} />
  }

  // Productos vacíos
  const emptyProducts = isEmptyArray(items)

  // Comprobar si no existen productos para mostrar, retornamos un componente que da al usuario a entender que no hay productos
  if (emptyProducts) <EmptyProducts />

  return (
    <Row as="section" className="products mx-5 mx-sm-3 mt-sm-5 mx-lg-5">
      {renderProducts}
    </Row>
  )
}

export default ProductsLastest

// <------------------------ Extra Components ------------------------>
const EmptyProducts = () => {
	const activeCategory = useSelector((state) => state.filters.activeCategory)

	return (
		<Empty
      image={emptyProductsImage}
      title={`No hemos encontrado productos con la categoría "${activeCategory}" para mostrar...`}
    />
	)
}
