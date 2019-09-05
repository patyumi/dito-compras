import axios from "axios";

const api = axios.create({
  baseURL: "https://storage.googleapis.com/dito-questions/",
  validateStatus: function(status) {
    return status >= 200 && status < 500;
  }
});

export default api;
