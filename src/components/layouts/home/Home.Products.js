// Librarys
import dynamic from "next/dynamic";
import { useDispatch } from 'react-redux'

// Actions
import getProductsActions from '@redux/actions/products'

const ProductsLastest = dynamic(() => import("@layouts/products/Products.Lastest"));
const ProductsCategories = dynamic(() => import("@layouts/products/Products.Categories"));

const HomeProducts = () => {
	const dispatch = useDispatch()

	// Extraer acción
	const { getLastestProductsByCategory } = getProductsActions(dispatch)

	return (
    <section className='container-products mb-5'>
      <ProductsCategories limit={8} callback={getLastestProductsByCategory} />
      <ProductsLastest />
    </section>
  )
}

export default HomeProducts
