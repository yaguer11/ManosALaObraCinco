const BASE_URL = "http://localhost:3001";

const getToken = () => localStorage.getItem("token");

export const fetchApi = (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    ...options.headers,
  };

  return fetch(`${BASE_URL}${endpoint}`, { ...options, headers }).then(
    (response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Error en la solicitud");
        });
      }
      return response.json();
    }
  );
};
