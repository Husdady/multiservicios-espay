// React
import { useState, useCallback, useMemo } from "react";

// Components
import { Button } from "@common";

// Librarys
import { useDispatch } from 'react-redux'

// Actions
import getProductsActions from '@redux/actions/products'

// Utils
import { isEmptyString } from "@utils/Validations";

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState("");

  // Evento 'onChange' en input que actualiza el estado con el nuevo valor de búsqueda
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, [value]);

  // Limpiar el valor de búsqueda
  const handleCleanValue = useCallback(() => {
    setValue("");
  }, []);

  // Evento 'submit' en formulario
  const handleSubmit = useCallback((e) => {
    // Prevenir que el formulario recarge la página
    e.preventDefault()

    // Extraer acciones
    const { searchProducts } = getProductsActions(dispatch)

    searchProducts(value)
  }, [value])

  // Renderizar botón de limpiar
  const renderCleanButton = useMemo(() => {
    // Si el valor de búsqueda está vacío
    if (isEmptyString(value)) return;

    return (
      <Button icon="times-circle" textColor="var(--bs-gray-300)" backgroundColor="transparent" className="d-flex align-items-center p-0 rounded-circle me-3" onClick={handleCleanValue} />
    )
  }, [value]);

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center container fluid search-products">
      <div className="d-flex justify-content-center align-items-center border-0 shadow rounded-pill w-100 px-4 py-3">
        {/* Entrada */}
        <input autoComplete="off" value={value} type="text" name="search-products" placeholder="Busca un producto..." onChange={handleChange} className="border-0 form-control fw-bold outline-0 py-0 shadow-none m-0" />

        {/* Renderizar botón de limpieza */}
        {renderCleanButton}

        {/* Botón para buscar */}
        <Button type='submit' icon="search" textColor="var(--bs-white)" backgroundColor="var(--bg-green)" className="d-flex justify-content-center align-items-center fs-6 py-2 px-4 rounded-pill opacity"  />
      </div>
    </form>
  );
}

export default Search
