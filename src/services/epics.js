import { fetchApi } from "./api";

export const fetchEpics = (projectId) => {
  return fetchApi(`/projects/${projectId}/epics`);
};

export const fetchEpicDetails = (epicId) => {
  return fetchApi(`/epics/${epicId}`);
};

export const createEpic = (epicData) => {
  return fetchApi("/epics", {
    method: "POST",
    body: JSON.stringify(epicData),
  });
};

export const updateEpic = (epicId, epicData) => {
  return fetchApi(`/epics/${epicId}`, {
    method: "PUT",
    body: JSON.stringify(epicData),
  });
};

export const deleteEpic = (epicId) => {
  return fetchApi(`/epics/${epicId}`, {
    method: "DELETE",
  });
};
