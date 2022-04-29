// React
import { Fragment, useEffect, useState, useMemo } from "react";

// Components
import Header from "./Header";
import Loading from '@layouts/loaders/Loading.Preload'

// Librarys
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./Footer"));

const loadingStyle = {
  height: '100vh'
}

const Container = ({ children, needRenderAgain }) => {
	const [isLoading, setLoading] = useState(true)

	// Renderizar contenido
	const renderContent = useMemo(() => {
		// El componente está cargando
	  if (isLoading) {
	    return <Loading style={loadingStyle} title={null} />
	  }

	  return children
	}, [isLoading, needRenderAgain])

	useEffect(() => {
		let mounted = true

		// Si el componente ya se montó, ocultar loading
		if (mounted) {
			setLoading(false)
		}

		return () => {
			mounted = false
		}
	}, [])

  return (
    <Fragment>
      <Header />
      	<main id="root" role="main">{renderContent}</main>
      <Footer />
    </Fragment>
  )
}

export default Container;
