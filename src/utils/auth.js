export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const now = Date.now() / 1000;

  return payload.exp > now;
};
