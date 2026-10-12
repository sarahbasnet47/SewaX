import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { Provider } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import store from "../redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App/>
    <ToastContainer/>
  </Provider>,
);
