import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { CommentProvider } from "./context/CommentContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <UserProvider>
          <CommentProvider>
            <App />
          </CommentProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
