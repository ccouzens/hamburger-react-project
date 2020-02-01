import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.interceptors.request.use(
  request => {
    console.log(request);
    return request;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);
ReactDOM.render(<App />, document.getElementById("root"));
