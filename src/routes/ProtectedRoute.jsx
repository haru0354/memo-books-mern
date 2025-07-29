import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);

  if (userStatus === "idle") {
    return <div>Loading...</div>;
  }

  if (userStatus === "failed" || !user) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
