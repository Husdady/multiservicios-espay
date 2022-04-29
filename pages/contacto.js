// React
import { Fragment, useState, useCallback, useEffect, useMemo } from 'react';

// Components
import ContactForm from "@layouts/form/Contact.Form";

// Librarys
import Image from "next/image";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Headers
import { ContactHeader } from '@headers'

// API
import { getContactInformation } from '@api/contact'

// Utils
import { isEmptyObject } from '@utils/Validations'
import { classnames, scrollToSection } from "@utils/Helper";

const Container = dynamic(() => import("@root/src/components/layouts/common/Container"));

const ContactPage = () => {
  return (
    <Fragment>
      {/* Head */}
      <ContactHeader />

      <Container>
        <Content />
      </Container>
    </Fragment>
  )
}

export default ContactPage;



const placeholderClasses = "placeholder placeholder-wave bg-placeholder col-12"
const contactLinkStyle = {
  height: 25,
}

// <------------------------ Extra Components ------------------------>
const Content = () => {
  // Realizar scroll hacia abajo cuando se monta el componente
  useEffect(() => {
    scrollToSection('shortcut-pal21')
  }, [])

  return (
    <div className="tm-contact mx-auto shortcut-pal21">
      <div className="row">
        <section className="col-md-6">
          <h3 className="title">Envíanos un mensaje:</h3>
          <div className="mb-4 me-5 border-bottom" />

          {/* Formulario de contacto */}
          <ContactForm />
        </section>

        {/* Información de contacto */}
        <ContactInfo />
      </div>
    </div>
  )
}

const ContactInfo = () => {
  const [contactInformation, setContactInformation] = useState({})

  // Comprobar si está cargando la información
  const isLoading = useMemo(() => {
    return isEmptyObject(contactInformation)
  }, [contactInformation])

  const contactLinks = useMemo(() => [
    { icon: "phone", value: '+' + contactInformation.phone },
    { icon: "envelope", value: contactInformation.email },
    {
      icon: ["fab", "facebook"],
      value:  <a href={contactInformation.facebookPage?.url} target="_blank" rel="noreferrer" style={{ color: "var(--bg-green)" }}>{contactInformation.facebookPage?.name}</a>
    }
  ], [contactInformation])

  // Si está cargando definir clases para mostrar los 'skeletons'
  const directionClasses = classnames([
    "w-100 mb-4 tm-info-title",
    isLoading ? placeholderClasses : null
  ])

  // Si está cargando definir clases para mostrar los 'skeletons'
  const contactLinkClasses = classnames([
    "tm-contact-link w-100",
    isLoading ? placeholderClasses : null
  ])

  // Si está cargando definir clases para mostrar los 'skeletons'
  const addressClasses = classnames([
    "mb-4 w-100",
    isLoading ? placeholderClasses : null
  ])

  // Renderizar ícono en enlaces de contacto
  const renderIcon = useCallback((icon) => {
    if (isLoading) return;
    return <FontAwesomeIcon icon={icon} className="tm-contact-icon" />
  }, [isLoading, contactInformation])


  // Renderizar texto
  const renderText = useCallback((value) => {
    if (isLoading) return;
    return <span>{value}</span>
  }, [isLoading, contactInformation])


  // Renderizar enlaces de contacto
  const renderContactLinks = useMemo(() => {
    return (
      <ul className="p-0">
        {contactLinks.map((contactLink, i) => (
          <li key={i} className={contactLinkClasses} style={contactLinkStyle}>
            {/* Ícono */}
            {renderIcon(contactLink.icon)}
            
            {/* Texto */}
            {renderText(contactLink.value)}
          </li>
        ))}
      </ul>
    )
  }, [contactLinks])

  // Renderizar imagen de contacto
  const renderImage = useMemo(() => {
    if (isLoading) {
      return <span className={placeholderClasses} style={{ height: 300 }}></span>
    }

    return (
      <Image
        width={100}
        height={100}
        loading="eager"
        objectFit="cover"
        placeholder="blur"
        layout="responsive"
        alt="contact-multiservicios-espay"
        src={contactInformation.contactPhoto?.url}
        blurDataURL={contactInformation.contactPhoto?.url}
        title="Urbanización Isabel Barreto MZ F LT 15 - Paita, Piura - Perú"
      />
    )
  }, [contactInformation, isLoading])

  // Obtener la información de contacto cuando se carga el componente
  useEffect(() => {
    getContactInformation({ setContactInformation })
  }, [])

  return (
    <section className="col-md-6">
      <div className="tm-address-box pb-4">
        <h4 className={directionClasses}>
          {renderText("Dirección de nuestro negocio:")}
        </h4>

        {/* Ubicación del negocio */}
        <address className={addressClasses} style={{ height: isLoading ? 35 : 'auto' }}>
          {contactInformation.location}
        </address>

        {/* Enlaces de contacto */}
        {renderContactLinks}
      </div>

      {/* Imagen de contacto */}
      {renderImage}
    </section>
  )
}