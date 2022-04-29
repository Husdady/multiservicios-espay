// Librarys
import { scroller } from "react-scroll";

// Utils
import dayjs from "./dayjs";
import {
  isString,
  isObject,
  isFunction,
  isArray,
  isEmptyArray,
} from "./Validations";

/**
 * Retorna un array de una longitud 'x'
 * @param {total: Number}
 * @returns
 */
function generateArray(total) {
  return Array.from(Array(total).map((_, i) => i))
}

/**
 * Encadenar un objeto sin comillas dobles
 * @param {obj: Object}
 * @returns
 */
function stringifyWithoutDoubleQuotes(obj) {
  if (!obj) return;

  const objectToStringify = JSON.stringify(obj);

  return objectToStringify?.replace(/"([^"]+)":/g, '$1:')
}

/**
 * Remover espacios en blanco y convertir a minúsculas
 * @param {value: String}
 * @returns
 */
function convertEmptySpacesInHyphens(value) {
  if (!value || !isString(value)) return;

  return value.replace(/\s+/gim, "-").toLowerCase();
}

/**
 * Obtener algunos campos del usuario
 * @param {str: String, limit: Number}
 * @returns
 */
function truncate(str, limit = 100) {
  if (!str) return str;

  if (str.length > limit) {
    return str.substring(0, limit) + "...";
  }

  return str;
}

/**
 * Formatear fecha
 * @param {date: String}
 * @returns
 */
function formatDate(date) {
  if (!date) return null

  // Formatear fecha con day.js
  const formattedDate = dayjs?.formatDate({
    date: date,
    format: "DD [de] MMMM [del] YYYY [a las] h:mm a",
  });

  // Ejm: 20 de Diciembre del 2021 a las 2:06 p.m.
  return formattedDate?.replace(/m$/gim, ".m.");
}

/**
 * Definir clases a un componente
 * @param {arrClasses: String}
 * @returns
 */
function classnames(arrClasses) {
  if (!isArray(arrClasses)) return

  return arrClasses.filter((el) => !!el).join(' ')
}

// Formatear números para mostrarlos como visitas
function nFormatter(num, digits = 0) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });

  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

/**
 * Obtener la posición del scroll
 * @param null
 * @returns
 */
function getScrollPosition() {
  // Obtener scroll de arriba
  const { scrollTop } = document.body || document.documentElement;

  // Obtener la altura de la ventana y la altura total del scroll
  const { scrollHeight, clientHeight } = document.documentElement;

  // Obtener altura del scroll
  const height = scrollHeight - clientHeight;

  // Comprobar en qué lugar de la página está el scroll
  const scrolled = scrollTop / height;

  // Convertir a entero la posición del scroll
  const fixedScrolled = (scrolled * 100).toFixed(2);

  return fixedScrolled;
}

/**
 * Mover scroll suavemente a una sección de la página
 * @param {options: Object}
 * @returns
 */
function scrollToSection(options) {
  const currentScrollPosition = getScrollPosition();

  if (currentScrollPosition > 400) return;

  const { duration, shortcut } = options;

  const scrollConfig = {
    duration: duration || 4000,
    smooth: true,
  };

  const isObjOptions = isObject(options)

  if (!isObjOptions) {
    scroller.scrollTo(options, scrollConfig);

    return null;
  }

  // Realizar scroll hacia una posición de la página
  scroller.scrollTo(shortcut, scrollConfig);
}

export {
  generateArray,
  stringifyWithoutDoubleQuotes,
  convertEmptySpacesInHyphens,
  truncate,
  nFormatter,
  formatDate,
  classnames,
  getScrollPosition,
  scrollToSection,
};
