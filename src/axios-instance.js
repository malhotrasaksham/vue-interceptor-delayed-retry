import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/"
});

axiosInstance.interceptors.response.use(
  config => {
    console.log("success");
    return config;
  },
  error => {
    let origRequest = error.config;
    if (!error.config._retryCount) {
      error.config._retryCount = 1;
    }
    if (error.config._retryCount < 4) {
      console.log(`Retry attempt ${error.config._retryCount}`);
      error.config._retryCount++;
      return setTimeout(_ => axiosInstance(origRequest), 2000);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
