// React
import { useEffect, useState, useCallback } from 'react';

// Hooks
import { isObject, isEmptyObject, isFunction, validateSchemaField } from "@utils/Validations";

const useForm = ({
	initialValues = {},
	validationSchema = {},
	validateOnChange = true,
	onSubmit = function() { return null }
}) => {

	const [errors, setErrors] = useState({});
	const [values, setValues] = useState(initialValues);
	const [isValidForm, setValidForm] = useState(false);
	const [formHasBeenEdited, setFormHasBeenEdited] = useState(false);
	
  const schemaFields = Object.getOwnPropertyNames(validationSchema);
	const getRulesSchema = validationSchema ? Object.values(validationSchema) : [];
	const getFieldsFromSchema = validationSchema ? schemaFields : [];

  useEffect(() => {
    verifyIfIsValidForm();
  }, []);


	// Ejecutar validación en el evento 'onSubmit' del formulario para saber si existen errores
  const runValidationSubmit = useCallback(({ schemaErrors, extraData = {} }) => {
    // Setear errores
    setErrors(schemaErrors);
    
    // Si no existen errores en el formulario
    if (isEmptyObject(schemaErrors)) {
      // Setear formulario válido
      setValidForm(true);
    	setFormHasBeenEdited(true);

      // Setear datos adicionales a 'extraData'
      Object.assign(extraData, {
        setFormStatus: setFormHasBeenEdited,
        formHasBeenEdited: formHasBeenEdited,
      });

      // Ejecutar evento onSubmit
      if (isFunction(onSubmit)) {
        onSubmit({
          values: values,
          resetForm: resetForm,
          extraData: extraData,
          setErrors: setErrors,
        });
      }
    }
  }, [values]);


	// Validar las reglas del esquema
  const runValidationSchemaRules = useCallback((field, value) => {
    // Obtener reglas del campo (required, min, max, etc)
    const fieldRules = validationSchema[field];

    // Comprobar si existe la regla min
    const existMinRule = fieldRules?.min;
    const min = existMinRule?.limit;
    const minMessage = existMinRule?.message;

    // Comprobar si existe la regla max
    const existMaxRule = fieldRules?.max;
    const max = existMaxRule?.limit;
    const maxMessage = existMaxRule?.message;

    // Reglas del esquema
    const rules = {
      name: field,
      value: value,
      required: fieldRules?.required,
      min: {
        limit: min || existMinRule,
        message: existMinRule && (isFunction(minMessage) ? minMessage(min) : minMessage),
      },
      max: {
        limit: max || existMaxRule,
        message: existMaxRule && (isFunction(maxMessage) ? maxMessage(min) : maxMessage),
      },
    };

    // Si existe la regla 'isEmail' en un campo del esquema
    if (fieldRules?.isEmail) {
      // Agregar regla 'isEmail' a todos las reglas
      rules.isEmail = fieldRules?.isEmail;

      // Si existe la regla 'isMatchPassword' en un campo del esquema
    } else if (fieldRules?.isMatchPassword) {
      // Obtener campo relacionado
      const relateWithField = validationSchema[fieldRules.relateWithField];

      // Obtener propiedades del campo relacionado
      rules.required = relateWithField?.required;
      rules.min.limit = relateWithField?.min || relateWithField?.min?.limit;
      rules.min.message = relateWithField?.min?.message;
      rules.max.limit = relateWithField?.max || relateWithField?.max?.limit;
      rules.max.message = relateWithField?.max?.message;

      // Agregar regla 'isMatchPassword' a todos las reglas
      rules.isMatchPassword = {
        value: values[fieldRules.relateWithField],
        relateWithField: fieldRules.relateWithField,
      };
    }

    // Validar campos del esquema
    const errorsFromSchema = validateSchemaField(rules);

    // Retornar errores encontrados en un campo
    return errorsFromSchema;
  }, []);


	// Validar errores en los campos del esquema
	const	runValidationErrors = useCallback((field, newErrors) => {
		const currentErrors = { ...errors };

		const withOutErrors = isEmptyObject(errors) && isEmptyObject(newErrors);
    // Si no existen errores, finalizar validación
    if (withOutErrors) return;

    // Si no existen errores, limpiar errores
    if (isEmptyObject(newErrors)) {
      delete currentErrors[field];
      return setErrors(currentErrors);
    }

    // Setear errores
    return setErrors({ ...currentErrors, ...newErrors });
	}, [errors]);


	// Validar todos los campos
	const	runValidateAllFields = useCallback((extraData) => {
		if (!validationSchema) return;

		const schemaErrors = getRulesSchema.reduce((acc, _, i) => {
      // Obtener cada campo del esquema
      const field = getFieldsFromSchema[i];

      // Validar reglas del esquema
      const validation = runValidationSchemaRules(field, values[field]);
      return { ...acc, ...validation };
    }, {});

    // Validar evento submit
    runValidationSubmit({
      schemaErrors: schemaErrors,
      extraData: extraData,
    });
	}, [values]);


  // Setear un campo
	const	setFieldValue = useCallback((field, value) => {
		// Si no está habilitada la función "validateOnChange", finalizar función
    if (!validateOnChange) return;

		// Establecer nuevo estado
    const newState = { ...values, [field]: value };

    let handle_errors = {};

    // Si está activa la función "validationSchema"
    if (isObject(validationSchema)) {
      // Obtener errores de la validación del esquema
      handle_errors = runValidationSchemaRules(field, value);
    }

    // Validar errores
    runValidationErrors(field, handle_errors);

    // Si el formulario no ha sido editado
    if (!formHasBeenEdited) {
      setFormHasBeenEdited(true);
    }

    // Actualizar estado
    return setValues(newState);
	}, [values, errors]);


  // Setear múltiples campos
	const	multipleSetField = useCallback((fields) => {
    // Si no es un objeto el parámetro 'fields'
    if (!isObject(fields)) return;

    // Setear estado del formulario a "editado"
    setFormHasBeenEdited(true);

    // Setear nuevos campos
    setValues({ ...values, ...fields });
  }, [values]);


  // Método que se ejecuta cuando el formulario es válido
	const	handleSubmit = useCallback((e, extraData = {}) => {
		e.preventDefault();
		return runValidateAllFields(extraData);
	}, [values]);


  // Verificar si es formulario válido
  const verifyIfIsValidForm = useCallback(() => {
    // Recorrer las propiedades del esquema, retornar true si el formulario tiene valores válidos y false cuando tiene información vacía
    const isValidForm = Object.keys(validationSchema).every(
      (property) => values[property]
    );

    // Si no existen errores, setear formulario válido
    if (isEmptyObject(errors) && isValidForm) {
      return !isValidForm && setValidForm(true);
    } else {
      return isValidForm && setValidForm(false);
    }
  }, [errors, isValidForm]);


  // Resetear formulario
	const resetForm = useCallback(() => {
		setErrors({});
		setValidForm(false);
		setFormHasBeenEdited(false);
		setValues(initialValues);
	}, []);

	return {
		values: values,
		errors: errors,
		setErrors: setErrors,
		setFieldValue: setFieldValue,
		multipleSetField: multipleSetField,
		handleSubmit: handleSubmit,
		resetForm: resetForm,
    isValidForm: isValidForm,
    formHasBeenEdited: formHasBeenEdited,
	}
}

export default useForm;
