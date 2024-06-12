import { Outlet, useLocation, matchPath } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  let variant;
  let showHeader = true;

  switch (location.pathname) {
    case "/":
    case "/books":
    case "/setting":  
      variant = "oneColumn";
      break;
    default:
      variant = "twoColumn";
  }

  if (
    matchPath("/:bookId/:chapterId", location.pathname) ||
    matchPath("/:bookId", location.pathname)
  ) {
    showHeader = false;
  }

  if (
    matchPath("/books", location.pathname) ||
    matchPath("/setting", location.pathname)
  ) {
    showHeader = true;
  }

  return (
    <>
      {showHeader && <Header variant={variant} />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
