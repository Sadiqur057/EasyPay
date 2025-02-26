import { useContext } from "react";
import AuthContext from "../provider/AuthContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log("checking loading", loading);

  console.log("User in PrivateRoutes:", user);
  console.log("loading", loading);
  if (loading) {
    console.log("Loading...");
    return <div className="bg-gray-800 text-white min-h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  if (user && !loading) {
    console.log("Authenticated user:", user);
    return children;
  }

  console.log("Not authenticated, redirecting to login");
  return <Navigate to="/login" />;
};

export default PrivateRoutes;
