const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    authorization: localStorage.getItem("accessToken"),
  },
};

export default config;
