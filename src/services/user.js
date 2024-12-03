import { fetchApi } from "./api";

export const updateProfile = (profileData) => {
  return fetchApi("/user/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};
