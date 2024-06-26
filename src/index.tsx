import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "@/styles/index.css";
import App from "./App";
import store from "@/store";
import { Provider } from "react-redux";
import "@/console";

if (process.env.REACT_APP_MOCK) {
  require("@/mock");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
