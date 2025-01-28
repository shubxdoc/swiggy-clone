import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const { userData } = useSelector((state) => state.authSlice);

  if (!userData) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
