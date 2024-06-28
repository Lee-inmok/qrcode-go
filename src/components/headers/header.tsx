import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuthenticator((context) => [context.user]);

  return (
    <header>
      <nav>
        <Button onClick={() => navigate("/host")}>qr cord</Button>
        <Button onClick={() => navigate("/client")}>client</Button>
        <Button onClick={() => navigate("/Check")}>Check</Button>
        <br></br>
        <span>{user?.username}</span>
        <Button onClick={signOut}>Sign Out</Button>
      </nav>
    </header>
  );
};

export default Header;
