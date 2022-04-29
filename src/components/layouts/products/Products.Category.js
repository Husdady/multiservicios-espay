// React
import { useCallback, memo } from "react";

// Librarys
import { Col } from "react-bootstrap";

// Utils
import { classnames } from '@utils/Helper'
import { isFunction } from '@utils/Validations'

const Category = memo(({ _id, name, isActive, onClick, callback }) => {
  // Clases de cada categoría
  const categoryClasses = classnames([
    'd-flex align-items-center justify-content-center category-product my-2 m-sm-2',
    isActive ? "active" : null,
  ])

  // Evento 'click' en categoría
  const handleClick = useCallback(() => {
    onClick({ _id, name })

    // Si 'callback' no es una función
    if (!isFunction(callback)) return

    // Pasar el 'id' de la categoría  
    callback(_id)
  }, [])

  return (
    <Col
      as="li"
      role="button"
      lg
      sm={5}
      xs={12}
      onClick={handleClick}
      className={categoryClasses}
    >
      <span>{name}</span>
    </Col>
  )
})

export default Category;
