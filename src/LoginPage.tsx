import React, { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@mui/material";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Authenticator
      signUpAttributes={["picture", "email", "name", "nickname", "birthdate"]}
    >
      {({ signOut, user }) => {
        if (user) {
          const { from, search } = location.state || { from: "/", search: "" };
          navigate(from + search, { replace: true });
        }
        return (
          <div>
            <h1>Welcome, {user?.username}</h1>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        );
      }}
    </Authenticator>
  );
};

export default LoginPage;
