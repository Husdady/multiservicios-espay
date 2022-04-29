// Thunks
import {
	searchProducts,
	getMoreProducts,
	getAleatoryProducts,
	getPaginatedProducts,
	getLastestProductsByCategory,
} from '@redux/thunks'

// Types
import { SAVE_PRODUCTS_FILTERS } from '@redux/types'

export default function(dispatch) {
	return {
		// Buscar productos
		searchProducts: (value) => dispatch(searchProducts(value)),

		// Obtener más productos
		getMoreProducts: (extraData) => dispatch(getMoreProducts(extraData)),

		// Obtener productos paginados
		getPaginatedProducts: function(extraData) {
			return dispatch(getPaginatedProducts(extraData))
		},

		// Obtener los últimos productos por una categoría
		getLastestProductsByCategory: function() {
			return dispatch(getLastestProductsByCategory())
		},

		// Obtener productos aleatoriamente
		getAleatoryProducts: function(extraData) {
			return dispatch(getAleatoryProducts(extraData))
		},
		
		// Cambiar la actual categoría activada
		changeActiveCategory: function(category) {
			return dispatch({
				type: SAVE_PRODUCTS_FILTERS,
				payload: {
					activeCategory: category
				}
			})
		},  
	}
}