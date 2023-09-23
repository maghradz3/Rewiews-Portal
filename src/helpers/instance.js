import axios from "axios";
import env from "react-dotenv";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: backendUrl,
});

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (response) => {
    console.log(response);
    const origianlRequest = response.confing;
    if (
      response.response.status === 401 &&
      response?.response?.data?.message === "token not valid"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");
      axios
        .post("https://reviews-portal-back.onrender.com/user/refresh", {
          refresh_token: refreshToken,
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          return axiosInstance(origianlRequest);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
);
