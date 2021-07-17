import axios from "axios";

axios.interceptors.request.use(function (config) {
  config.headers['token'] = window.localStorage.getItem('token');
  config.headers['token2'] = window.localStorage.getItem('token2');

  return config;
});

export {
  axios
};