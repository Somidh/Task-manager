import "./index.css";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxProvider } from "./redux/reduxProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
