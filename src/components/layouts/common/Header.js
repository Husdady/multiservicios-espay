// React
import { Fragment, useState, useCallback, useMemo } from 'react';

// Components
import { Button } from "@common";
import AppLogo from "./AppLogo";
import Menu from "./Header.Menu";
import HeaderLinks from "./Header.Links";

// API
import { APP_NAME } from '@api/credentials'

// Hooks
import { useMediaQuery } from "@hooks";

const backgroundImage = require("@assets/img/header/background-image.webp").default.src;

const Header = () => {
  return (
    <header
      className="w-100 position-relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Background Black */}
      <div className="wrap position-absolute top-0 start-0 bottom-0 end-0" />

      {/* Left Section */}
      <div
        style={{ zIndex: 1000 }}
        className="w-100 position-absolute left-0 bottom-0 text-white"
      >
        <div className="row tm-header-inner">
          <div className="col-md-6 col-12 box-logo d-flex align-items-center flex-wrap">
            <AppLogo />
            <div className="ms-3 tm-site-text-box">
              <h1 className="app-name mb-1">{APP_NAME}</h1>
              <h6 className="mb-0 short-message">Venta de todo tipo de repuestos para motos y carros</h6>
            </div>
          </div>

          {/* Navigation Links */}
          <NavLinks />
        </div>
      </div>
    </header>
  )
}

export default Header;

// <------------------------ Extra Components ------------------------>
const NavLinks = () => {
  const [isVisibleMenu, setMenu] = useState(false);
  const isTable = useMediaQuery("(max-width: 1068px)");

  // Mostrar / ocultar el menú
  const handleChangeVisibilityMenu = useCallback(() => {
    setMenu((state) => !state);
  }, [isVisibleMenu]);

  // Renderizar enlaces de navegación
  const renderLinks = useMemo(() => {
    if (!isTable) return <HeaderLinks />;

    return (
      <Button
        style={{ height: 40 }}
        attributes={{ id: "toggle-menu-icon" }}
        className="w-auto p-0 rounded"
        onClick={handleChangeVisibilityMenu}
        backgroundColor="rgb(47 149 109 / 58%)"
        icon={{
          name: "bars",
          color: "var(--bs-gray-300)",
          style: {
            width: 40,
            height: 40,
            padding: 10,
          }
        }}
      />
    )
  }, [isTable]);

  return (
    <Fragment>
      {/* Enlaces de menú */}
      {renderLinks}

      {/* Menu */}
      {isTable && <Menu isVisible={isVisibleMenu} />}
    </Fragment>
  );
}