import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);

  if (userStatus === "idle") {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/books" replace />;
  }

  return element;
};

export default PublicRoute;
