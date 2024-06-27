import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Host from "./page/hostpage/Host";
import Client from "./page/clientpage/Client";
import LoginPage from "./LoginPage";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import ProtectedRoute from "./AWSAuthProtected";
import Header from "./components/headers/header";

Amplify.configure(awsExports);

const App: React.FC = () => {
  return (
    <Authenticator.Provider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/host" />} />
          <Route path="/host" element={<Host />} />
          <Route
            path="/client"
            element={
              <ProtectedRoute>
                <Client />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
};

export default App;
