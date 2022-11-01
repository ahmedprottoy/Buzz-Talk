const config = () => ({
  headers: {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("accessToken"),
  },
});

export default config;
