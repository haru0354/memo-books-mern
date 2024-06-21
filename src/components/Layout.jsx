import { Outlet, useLocation, matchPath } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  let variant;
  let showHeaderAndFooter = true;

  switch (location.pathname) {
    case "/":
    case "/books":
    case "/setting":  
    case "/privacypolicy":  
      variant = "oneColumn";
      break;
    default:
      variant = "twoColumn";
  }

  if (
    matchPath("/:bookId/:chapterId", location.pathname) ||
    matchPath("/:bookId", location.pathname)
  ) {
    showHeaderAndFooter = false;
  }

  if (
    matchPath("/books", location.pathname) ||
    matchPath("/setting", location.pathname) ||
    matchPath("/privacypolicy", location.pathname)
  ) {
    showHeaderAndFooter = true;
  }

  return (
    <>
      {showHeaderAndFooter && <Header variant={variant} />}
      <main>
        <Outlet />
      </main>
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

export default Layout;
