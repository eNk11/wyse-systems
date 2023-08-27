import React from "react";
import ReactDOM from "react-dom/client";
import LocalRoutes from "./task-application/LocalRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalRoutes />
  </React.StrictMode>
);
