// Librarys
import Link from "next/link";
import Image from "next/image";

// API
import { PUBLIC_URL } from "@api/credentials";

const logo = require("@assets/img/header/logo.webp").default.src;

const AppLogo = () => {
  return (
    <figure
        style={{ width: 60, height: 60 }}
        className="d-table mb-0 overflow-hidden rounded-circle cursor-pointer app-logo"
      >
      <Link href={PUBLIC_URL}>
        <a>
          <Image
            alt="logo"
            loading="eager"
            placeholder="blur"
            objectFit="cover"
            layout="responsive"
            title="Multiservicios Espay"
            width="100%"
            height="100%"
            src={logo}
            blurDataURL={logo}
          />
        </a>
      </Link>
    </figure>
  )
}

export default AppLogo;
