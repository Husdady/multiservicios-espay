// React
import { useMemo } from "react";

// Components
import { Empty, Scroller } from '@common'
import Loading from '@layouts/loaders/Loading.Preload'

// Librarys
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from "react-bootstrap";

// Actions
import getProductsAction from '@redux/actions/products'

// Utils
import { classnames } from '@utils/Helper'
import { isEmptyArray } from '@utils/Validations'

const Product = dynamic(() => import("./Products.Item"));
const emptyProductsImage = require('@assets/img/products/empty-products.webp').default.src

const loadMoreButton = {
  title: "Cargar más productos",
  textColor: "var(--bs-white)",
  backgroundColor: "var(--bg-success)",
  className: "d-block mx-auto mt-5 py-3 rounded-pill fs-6 opacity",
  style: {
    width: '80%',
    fontFamily: 'Open Sans'
  }
}

const loadingStyle = {
  height: 500
}

const ProductsItems = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const limit = useSelector((state) => state.filters.limit)

  const { items, loading } = products

  // Renderizar productos
  const renderProducts = useMemo(() => {
    return products.items.map((product, i) => (
      <Col key={i} lg={3} md={4} sm={6} className="p-2 container-product">
        <Product {...product} />
      </Col>
    ))
  }, [products]);

  // Comprobar si están cargando los productos
  if (loading) {
    return <Loading style={loadingStyle} title={null} />
  }

  // Productos vacíos
  const emptyProducts = isEmptyArray(items)

  // Comprobar si no existen productos para mostrar, retornamos un componente que da al usuario a entender que no hay productos
  if (emptyProducts) {
    return (
      <Empty
        image={emptyProductsImage}
        title="No hemos encontrado productos para mostrar..."
      />
    )
  }

  // Extrar acción
  const { getMoreProducts } = getProductsAction(dispatch)

  return (
    <Scroller limit={limit} onLoadMore={getMoreProducts} loadMoreButton={loadMoreButton}>
      <Row as="section" className="products mx-5 mx-sm-3 mt-sm-5 mx-lg-5">
        {renderProducts}
      </Row>
    </Scroller>
  )
}

export default ProductsItems
