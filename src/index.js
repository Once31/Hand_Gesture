import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Header from "./Header";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Route path="/" component={App} />
  </Router>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorkerRegistration.unregister();
