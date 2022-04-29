// React
import { memo } from "react";

// Components
import AppName from "./AppName";
import HeaderLinks from "./Header.Links";

const Menu = memo(({ isVisible }) => {
  const isOpen = isVisible ? "open" : "closed";
  const activeClasses = `w-100 py-4 ${isOpen}`;

  return (
    <aside id="menu" className={activeClasses}>
      <HeaderLinks />
      <AppName className="mt-3" titleStyle={{ fontSize: 20 }} titleClass="fw-bold text-center" />
    </aside>
  )
});

export default Menu;
