// React
import { useMemo, useCallback, createRef } from "react";

// Components
import { Button } from "@common";
import { renderError } from "./Error.Form";

// Hooks
import { useForm } from '@hooks';

// API
import { sendEmailMessage } from '@api/contact';

// Utils
import { isEmptyString } from "@utils/Validations";

const ContactForm = () => {
  const refSubmitButton = createRef();

  const validationContactForm = useMemo(() => ({
    name: {
      required: 'Ingresa tu nombre'
    },
    email: {
      isEmail: true
    },
    description: {
      required: 'Ingresa una descripción',
      min: {
        limit: 100,
        message: 'La descripción es muy corta'
      }
    }
  }), []);

  const { values, setFieldValue, errors, handleSubmit } = useForm({
    initialValues: {
      name: '',
      email: '',
      description: ''
    },
    validationSchema: validationContactForm,
    onSubmit: sendEmailMessage,
  });

  // Evento 'submit' en formulario
  const handleSubmitForm = (e) => {
    return handleSubmit(e, {
      showLoading: refSubmitButton.current.showLoading,
      hideLoading: refSubmitButton.current.hideLoading,
    });
  }

  // Actualizar el campo 'name' del formulario
  const handleChangeName = useCallback((e) => {
    setFieldValue('name', e.target.value)
  }, [values]);

  // Actualizar el campo 'email' del formulario
  const handleChangeEmail = useCallback((e) => {
    setFieldValue('email', e.target.value)
  }, [values]);

  // Actualizar el campo 'message' del formulario
  const handleChangeDescription = useCallback((e) => {
    setFieldValue('description', e.target.value)
  }, [values]);

  const descriptionError = useMemo(() => {
    const wordsCount = !isEmptyString(values.description) && values.description.length < 100 ? `(${values.description.length}/100)` : null;
    const joinWords = [errors.description, wordsCount].join(" ");

    return joinWords === " " ? null : joinWords;
  }, [errors.description, values.description]);
  
  return (
    <form onSubmit={handleSubmitForm} className="tm-contact-form">
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Nombre Completo"
          className="form-control border-top-0 border-start-0 border-end-0"
          value={values.name}
          onChange={handleChangeName}
        />

        {/* Error en campo 'name' del formulario */}
        {renderError(errors.name)}
      </div>

      {/* Email */}
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChangeEmail}
          placeholder="Correo electrónico"
          className="form-control border-top-0 border-start-0 border-end-0"
        />

        {/* Error en campo 'email' del formulario */}
        {renderError(errors.email)}
      </div>

      <div className="form-group">
        <textarea
          rows="5"
          name="message"
          className="form-control border-top-0 border-start-0 border-end-0"
          placeholder="Escribe algo..."
          value={values.description}
          onChange={handleChangeDescription}
        />

        {/* Error en campo 'description' del formulario */}
        {renderError(descriptionError)}
      </div>

      <Button
        ref={refSubmitButton}
        type="submit"
        title="Enviar mensaje"
        backgroundColor="var(--bg-green)"
        className="tm-btn float-end text-white"
        loading={{ className: "mx-5" }}
        style={{ padding: "10px 30px" }}
      />
    </form>
  )
}

export default ContactForm;
