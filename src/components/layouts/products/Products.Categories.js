// React
import { useState, useEffect, useCallback, memo, useMemo } from "react";

// Components
import Category from './Products.Category'

// Librarys
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'

// API
import { getCategories } from '@api/categories'

// Actions
import getProductsAction from '@redux/actions/products'

// Utils
import { isEmptyArray } from '@utils/Validations' 
import { classnames, generateArray } from '@utils/Helper'

const placeholderHeight = {
  height: 50
}
 
const Categories = ({ limit, callback }) => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([]);
  const activeCategory = useSelector((state) => state.filters.activeCategory)

  // Crear placeholders dependiendo del límite de categorías
  const placeholders = useMemo(() => generateArray(limit), [])

  // Activar una categoría
  const handleActiveCategory = useCallback((category) => {
    // Extraer action
    const { changeActiveCategory } = getProductsAction(dispatch)

    changeActiveCategory(category)
  }, [])

  // Renderizar categorías
  const renderCategories = useMemo(() => {
    // Categorías vacías
    const emptyCategories = isEmptyArray(categories)

    if (emptyCategories) {
      return placeholders.map((_, i) => (
        <span key={i} className="col-12 col-sm-5 col-lg-2 m-2 placeholder placeholder-wave bg-placeholder" style={placeholderHeight}></span>
        )) 
    }

    return categories.map((category) => (
      <Category
        key={category._id}
        callback={callback}
        onClick={handleActiveCategory}
        isActive={activeCategory?.name === category.name}
        {...category}
      />
    ));
  }, [categories, activeCategory]);

  // Obtener categorías cuando se carga el componente
  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      getCategories({
        setCategories: setCategories,
        activeCategory: activeCategory,
        setActiveCategory: handleActiveCategory,
        args: {
          limit: limit,
          getLastestCategories: limit !== 0,
        }
      })
    }

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="container fluid">
      <Row as="ul" className="p-4 py-sm-0 text-center justify-content-center categories">
        {renderCategories}
      </Row>
    </div>
  )
}

export default Categories

Categories.defaultProps = {
  limit: 0
}
