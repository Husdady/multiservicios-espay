// React
import { useEffect } from 'react'

// Components
import ProductsItems from "./Products.Items"
import ProductsCategories from "./Products.Categories"

// Librarys
import { useSelector, useDispatch } from 'react-redux'

// Action
import getProductsAction from '@redux/actions/products'

// Utils
import { classnames } from '@utils/Helper'

const Products = ({ className, limitCategories }) => {
	const dispatch = useDispatch()
	const activeCategory = useSelector((state) => state.filters.activeCategory)

  const productsClasses = classnames([
  	"container-products", "mb-5", className,
  ])

  useEffect(() => {
  	if (!activeCategory) return

  	// Extraer acción
  	const { getPaginatedProducts } = getProductsAction(dispatch)

  	// Obtener productos paginados
  	getPaginatedProducts()
  }, [activeCategory])

  return (
    <section className={productsClasses}>
      <ProductsCategories />
      <ProductsItems />
    </section>
  )
}

export default Products;
