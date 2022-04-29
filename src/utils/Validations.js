// Comprobar si es un string
function isString(str) {
  return typeof str === "string";
}

// Comprobar si es un string vacío
function isEmptyString(str) {
  if (!isString(str)) return false;
  return str.length === 0;
}

// Comprobar si es un número
function isNumber(number) {
  return typeof number === "number";
}

// Comprobar si es un valor booleano
function isBoolean(data) {
  return typeof data === "boolean";
}

// Comprobar si es una función
function isFunction(func) {
  return typeof func === "function";
}

// Comprobar si es un arreglo
function isArray(array) {
  return Array.isArray(array);
}

// Comprobar si es un arreglo vacío
function isEmptyArray(array) {
  if (!isArray(array)) return false;
  return array.length === 0;
}

// Comprobar si es un valor verdadero
function isTrue(data) {
  return isBoolean(data) && data === true;
}

// Comprobar si es un valor falseo
function isFalse(data) {
  return isBoolean(data) && data === false;
}

// Comprobar si es un número
function isUndefined(data) {
  return typeof data === "undefined";
}

// Comprobar si es un objeto
function isObject(obj) {
  return typeof obj === "object";
}

// Comprobar si es un objeto vacío
function isEmptyObject(obj) {
  return obj && isObject(obj) && Object.keys(obj).length === 0;
}

// Comprobar si la longitud de un string es menor que el valor asignado
function isLessThan({ value, min }) {
  const validTypes = isString(value) || isArray(value);
  
  return validTypes && isNumber(min) && value.length < min;
}

// Comprobar si la longitud de un string es mayor que el valor asignado
function isGreaterThan({ value, max }) {
  return isString(value) && isNumber(max) && value.length > max;
}

// Comprobar si el objecto 'window' está disponible
function isWindowAvailable() {
  return typeof window !== 'undefined'
}

// Comprobar si es un correo electrónico
function isEmail(email) {
  const verifyEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (verifyEmail.test(email)) return true;

  return false;
}

// Comprobar si es un campo válido de un formulario
function validateSchemaField(field) {
  // Errores de la validación
  const errors = {};
  
  // Validar regla 'min' del esquema
  const minValidation = isLessThan({
    value: field.value,
    min: field.min.limit,
  });

  // Validar regla 'max' del esquema
  const maxValidation = isGreaterThan({
    value: field.value,
    max: field.max.limit,
  });

  // Comprobar si existe la regla 'required' en el esquema
  if (!field.value || isEmptyArray(field.value)) {
    // Si el campo no tiene valor
    field.required && (errors[field.name] = field.required);

    // Setear un mensaje por defecto para el campo email
    field.name === 'email' && (errors[field.name] = field.required || "Por favor ingresa un correo electrónico");

    // Comprobar si existe la regla 'min' en el esquema
  } else if (minValidation) {
    if (field.min.limit) {
      const minMessage = `Debe tener un mínimo de ${field.min.limit} cáracteres`;

      errors[field.name] = field.min.message || minMessage;
    }

    // Comprobar si existe la regla 'max' en el esquema
  } else if (maxValidation) {
    if (field.max.limit) {
      const maxMessage = `Se ha excedido la longitud máxima de ${field.max.limit} cáracteres`;

      errors[field.name] = field.max.message || maxMessage;
    }

    // Comprobar si existe la regla 'isEmail' en el esquema
  } else if (field.isEmail) {
    // Si no es un email válido
    if (!isEmail(field.value)) {
      errors[field.name] = "Ingresa un correo electrónico válido";
    }

    // Comprobar si existe la regla 'isMatchPassword' en el esquema
  } else if (field.isMatchPassword) {
   if (field.value !== field.isMatchPassword.value) {
      errors[field.name] = "Ambas contraseñas no coinciden";
    }
  }

  return errors;
}

export {
  isString,
  isEmptyString,
  isNumber,
  isBoolean,
  isFunction,
  isArray,
  isEmptyArray,
  isTrue,
  isFalse,
  isUndefined,
  isObject,
  isEmptyObject,
  isLessThan,
  isGreaterThan,
  isWindowAvailable,
  validateSchemaField,
};
