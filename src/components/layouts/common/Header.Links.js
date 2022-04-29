// React
import { memo, useMemo } from "react";

// Librarys
import Link from "next/link";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// JSON
import headerLinks from '@assets/json/header-links';

const HeaderLinks = memo(() => {
  const links = headerLinks.map((item, i) => {
    return <HeaderLink key={i} {...item} />
  });

  return (
    <nav className="col-md-6 col-12 d-flex align-items-center justify-content-end">
      <ul className="d-flex justify-content-end mb-0 tm-nav-ul">{links}</ul>
    </nav>
  )
});

export default HeaderLinks;

// <------------------------ Extra Components ------------------------>
const HeaderLink = memo(({ path, title, icon }) => {
  const { pathname } = useRouter();
  const activePath = useMemo(() => {
    const isActivePath = pathname === path;
    const includePath = path.length > 1 && pathname.includes(path);
    
    return isActivePath  || includePath;
  }, [pathname, path]);

  const classes = ["tm-nav-link"];
  if (activePath) classes[1] = "active";

  const linkClass = classes.join(" ");

  return (
    <li className="d-block px-4 tm-nav-li">
      <Link href={path}>
        <a className={linkClass}>
          <FontAwesomeIcon icon={icon} />
          <span className="ms-2">{title}</span>
        </a>
      </Link>
    </li>
  )
});