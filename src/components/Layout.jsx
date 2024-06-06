import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  let variant;

  switch (location.pathname) {
    case "/":
    case "/books":
      variant = "oneColumn";
      break;
    default:
      variant = "twoColumn";
  }

  return (
    <>
      <Header variant={variant} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
