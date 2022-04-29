// React
import { Fragment, useEffect, useState, useCallback, useMemo } from "react";

// Components
import Loading from "@root/src/components/layouts/loaders/Loading.Preload";

// Librarys
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { useStore } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from "redux-persist/integration/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Reducers
import { wrapper } from "@redux/store";

// API
import { APP_NAME } from '@api/credentials'

// Utils
import { isWindowAvailable } from '@utils/Validations'

// Library Styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'nprogress/nprogress.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Main styles
import "@assets/styles/global.css";
import "@assets/styles/header.css";

// 404 Styles
import "@styles/404/index.css";

// Home Styles
import "@styles/home/index.css";

// Products Styles
import "@styles/product/index.css";
import "@styles/products/index.css";

// Contact Styles
import "@styles/contact/index.css";

// Loaders Styles
import "@styles/loaders/loading.preload.css";

library.add(far, fas, fab)

// Opciones de Toast
const toastOptions = {
  error: {
    duration: 4000,
    className: 'fw-bold fs-6'
  },
  success: {
    duration: 6000,
    className: 'fw-bold fs-6'
  }
}

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(true);
  const store = useStore((state) => state);
  const persitor = isWindowAvailable() ? store.__persistor : store;

  // Mostrar loading cuando se cambia de ruta
  const handlesShowLoading = useCallback(() => {
    NProgress.start()
    setLoading(true)
  }, [])

  // Ocultar loading cuando se cargó la página
  const handlesHideLoading = useCallback(() => {
    NProgress.done()
    setLoading(false)
  }, [])

  // Evento que se dispara cuando se está cambiando de ruta
  Router.events.on('routeChangeStart', handlesShowLoading);

  // Evento que se dispara cuando se termina de cambiar de ruta
  Router.events.on('routeChangeComplete', handlesHideLoading);

  // Evento que se dispara cuando hay un error al cambiar de ruta 
  Router.events.on('routeChangeError', () => NProgress.done());

  useEffect(() => {
    let timeout = setTimeout(() => setLoading(false), 4000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  // Renderizar contenido de app
  const renderContent = useMemo(() => {
    if (isLoading) return <Loading />

    return (
      <Fragment>
        <Toaster toastOptions={toastOptions} />
        <Component {...pageProps} />
      </Fragment>
    ) 
  }, [isLoading, pageProps]);

  return (
    <PersistGate loading={null} persistor={persitor}>
      {/* Head */}
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      {/* Renderizar contenido de la app */}
      {renderContent}
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp);

