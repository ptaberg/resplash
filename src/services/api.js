// https://api.unsplash.com/search/photos?query=123&client_id=TkeJv_IfuDDUxigAJw93c7Fa4dnJq1PGjdVEm7kvTs8

const { default: axios } = require("axios");

const base = "https://api.unsplash.com/";

const api = axios.create({
  baseURL: base,
  timeout: 1000,
});

api.interceptors.request.use(
  async (config) => {
    const access_token = await localStorage.getItem("access_token");
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
