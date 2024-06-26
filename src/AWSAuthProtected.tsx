import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const AWSAuthProtected = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const location = useLocation();

  if (!user) {
    const fromPath = location.pathname.toString();
    const fromSearch = location.search.toString();
    return (
      <Navigate to="/login" state={{ from: fromPath, search: fromSearch }} />
    );
  }

  return children;
};

export default AWSAuthProtected;
