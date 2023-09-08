import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "localhost:5000",
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
        .post("localhost:5000", {
          refresh_token: refreshToken,
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          return axiosInstance(origianlRequest);
        });
    }
  }
);
