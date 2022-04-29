// React
import { useCallback, memo } from 'react'

// Components
import { Button } from "@common";

// Librarys
import Image from "next/image";
import { useRouter } from 'next/router'

// API
import { PUBLIC_URL } from '@api/credentials'

// Utils
import { truncate, formatDate, convertEmptySpacesInHyphens } from "@utils/Helper";

const color = "var(--bg-darkgreen)";
const productHeight = {
  height: 200
}

const Product = memo(({ name, price, createdAt, description, defaultImage }) => {
  const router = useRouter()
  const altImg = convertEmptySpacesInHyphens(name)

  const handleRedirectToProduct = useCallback(() => {
    router.push(`${PUBLIC_URL}/productos/${altImg}`)
  }, [])

  return (
    <article className="product shadow rounded overflow-hidden p-0 m-0">
      {/* Imagen del producto */}
      <figure className="position-relative m-0 w-100" style={productHeight} title={name}>
        <Image
          loading="eager"
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          alt={altImg}
          src={defaultImage.url}
          blurDataURL={defaultImage.url}
        />
      </figure>

      <div className="pt-2 pb-4 px-3">
        {/* Fecha de publicación */}
        <small className="d-block ms-auto text-end col-10" style={{ color: "var(--bs-gray-500)" }}>Publicado el {formatDate(createdAt)}</small>

        {/* Nombre del producto */}
        <h3 className="fs-5 fw-bold title mt-2" style={{ color }}>{name}</h3>

        {/* Descripción del producto */}
        <span className="d-block text-muted fs-6">{truncate(description, 75)}</span>

        {/* Precio del producto */}
        <h5 style={{ color }} className="fs-5 fw-bold title my-3 text-end pe-2">
          S/. {price.toFixed(2)}
        </h5>

        {/* Botón que al ser clickeado, redirecciona a un producto */}
        <Button title="Ver más" textColor={color} className="w-100 py-2 px-4 fs-6 rounded opacity" onClick={handleRedirectToProduct} />
      </div>
    </article>
  )
})

export default Product;
