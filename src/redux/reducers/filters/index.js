// Types
import * as types from '@redux/types';

// Utils
import { isFunction } from "@utils/Validations";

const initialState = {
  limit: 1,
  searchValue: '',
  showLoadMore: true,
  activeCategory: null,
  currentFilter: types.SORT_PRODUCTS_BY_NEWEST,
};

const filters = (state = initialState, action) => {
  const { type, payload, callback } = action;
  
  switch (type) {
    // Aplicar filtros en productos
    case types.SAVE_PRODUCTS_FILTERS:
      // Retornar callback si existe
      if (isFunction(callback)) {
        return callback(state);
      }

      return { ...state, ...payload }

    default:
      return state;
  }
}

// Obtener el estado del reducer
export const getFiltersState = ({ filters }) => ({ ...filters });
export default filters;
