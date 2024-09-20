import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { PrivateRouteURL, PublicRouteURL } from "../../constants";

interface PrivateRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
  role: null | "COMPANY" | "ADMIN" | "MANAGER" | "EMPLOYEE" | "CUSTOMER";
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  role,
  allowedRoles,
}) => {
  const { locale } = useParams();
  const redirectURL = !isAuthenticated
    ? PublicRouteURL.routeToClientSecretURL({
        locale: locale,
      })
    : role === null
    ? PrivateRouteURL.routeToStaffLoginURL({
        locale: locale,
      })
    : role === "ADMIN" || role === "MANAGER" || role === "EMPLOYEE"
    ? PrivateRouteURL.routeToStaffHomeURL({
        locale: locale,
      })
    : role === "CUSTOMER"
    ? PrivateRouteURL.routeToCustomerHomeURL({
        locale: locale,
      })
    : location.pathname;

  // NOTES: Staff and Customer Menu (when staff has role)
  if (isAuthenticated && allowedRoles && role && allowedRoles.includes(role)) {
    return children;
  }

  // NOTES: Staff Login (when staff doesn't have role but has key)
  if (isAuthenticated && !role) {
    return children;
  }

  return <Navigate to={redirectURL} />;
};

export default PrivateRoute;
