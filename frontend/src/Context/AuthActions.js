export const LogInStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LogInSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LogInFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
