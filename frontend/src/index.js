import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>,
    document.getElementById("root")
  );