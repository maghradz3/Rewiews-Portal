import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://reviews-portal-back.onrender.com",
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
        .post("https://reviews-portal-back.onrender.com", {
          refresh_token: refreshToken,
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          return axiosInstance(origianlRequest);
        });
    }
  }
);
