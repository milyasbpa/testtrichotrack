import React from "react";
import { Navigate, useParams } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
  restricted?: boolean; // if true, redirect to home if authenticated
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  isAuthenticated,
  restricted = false,
}) => {
  const { locale } = useParams();
  const redirectURL = `/${locale}/login`;
  return isAuthenticated && restricted ? (
    <Navigate to={redirectURL} />
  ) : (
    children
  );
};

export default PublicRoute;
