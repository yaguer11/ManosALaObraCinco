import { fetchApi } from "./api";

export const loginUser = (username, password) => {
  return fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const registerUser = (userData) => {
  return fetchApi("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};
