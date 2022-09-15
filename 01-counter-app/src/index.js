import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Our redux store
import { store } from "./app/store";
// The provider to make store accessible
import { Provider } from "react-redux";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
