// React
import { Fragment, createRef, useEffect, useState, useCallback, useMemo } from "react";

// Components
import Product from "./Products.Item";
import Loading from "@layouts/loaders/Loading.Preload"
// import Skeleton from "@root/src/components/layouts/skeletons/Skeleton.AleatoryProducts";

// Librarys
import Router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API
import { getAleatoryProducts } from "@api/product";

// Utils
import { classnames } from "@utils/Helper";
import { isArray, isEmptyArray } from "@utils/Validations";

SwiperCore.use([Navigation, Autoplay]);

const responsive = {
  1920: { slidesPerView: 6 },
  1280: { slidesPerView: 4 },
  850: { slidesPerView: 3 },
  540: { slidesPerView: 2 },
};

const AleatoryProducts = ({ autoplay, className, productToExclude }) => {
  const [isLoading, setLoading] = useState(true)
  const [aleatoryProducts, setAleatoryProducts] = useState([])

  // Clases de productos aleatorios
  const aleatoryProductsClasses = useMemo(() => {
  	return classnames(['aleatory-products', className])
  }, [className])

  // Configuración de 'autoplay'
  const autoplayConfig = useMemo(() => {
    return {
    	delay: 2000,
      disableOnInteraction: false,
      ...autoplay,
    }  
  }, [autoplay])

  // Mostrar loading
  const showLoading = useCallback(() => { setLoading(true) }, [])

  // Ocultar loading
  const hideLoading = useCallback(() => { setLoading(false) }, [])

  const onMount = useCallback(() => {console.log('[productToExclude]', productToExclude)
    getAleatoryProducts({
      showLoading: showLoading,
      hideLoading: hideLoading,
      productToExclude: productToExclude,
      setAleatoryProducts: setAleatoryProducts,
    })
  }, [productToExclude])

  // Renderizar productos aleatorios
  const renderAleatoryProducts = useMemo(() => {
    return aleatoryProducts.map((aleatoryProduct, i) => (
      <SwiperSlide key={i}>
        <Product {...aleatoryProduct} />
      </SwiperSlide>
    ))
  }, [aleatoryProducts])

  // Obtener productos aleatorios, en caso que 'productToExclude' exista
  useEffect(() => {
  	if (productToExclude) onMount()
  }, [productToExclude])

  // Mostrar loading en caso se este obteniendo la información del producto
  if (isLoading) {
  	return <Loading style={{ height: 400 }} />
  }

  return (
    <Swiper
      grabCursor
      as="section"
      speed={2000}
      spaceBetween={15}
      breakpoints={responsive}
      autoplay={autoplayConfig}
      className={aleatoryProductsClasses}
      navigation={{
        prevEl: ".prev-swiper",
        nextEl: ".next-swiper",
      }}
    >
    	{/* Renderizar productos aleatorios */}
      {renderAleatoryProducts} 

  
    	{/* Flecha izquierda */}
      <CustomLeftArrow color="var(--bg-darkgreen)" />

    	{/* Flecha derecha */}
      <CustomRightArrow color="var(--bg-darkgreen)" />
    </Swiper>
  );
}

export default AleatoryProducts;

AleatoryProducts.defaultProps = {
	autoplay: {},
	totalItems: 20,
}

const arrowStyles = {
	top: "50%",
  zIndex: 999,
}

// <------------------------ Extra Components ------------------------>
const CustomLeftArrow = ({ color }) => {
  return (
    <FontAwesomeIcon
      size="2x"
      role="button"
      color={color}
      style={arrowStyles}
      icon="arrow-circle-left"
      className="scale position-absolute start-0 prev-swiper"
    />
  )
};

const CustomRightArrow = ({ color }) => {
  return (
    <FontAwesomeIcon
      size="2x"
      role="button"
      color={color}
      style={arrowStyles}
      icon="arrow-circle-right"
      className="scale position-absolute end-0 next-swiper"
    />
  )
};

