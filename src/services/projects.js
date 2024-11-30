import { fetchApi } from "./api";

export const fetchProjects = () => {
  return fetchApi("/projects");
};

export const fetchProjectDetails = (projectId) => {
  return fetchApi(`/projects/${projectId}`);
};

export const createProject = (projectData) => {
  return fetchApi("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });
};

export const updateProject = (projectId, projectData) => {
  return fetchApi(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(projectData),
  });
};

export const deleteProject = (projectId) => {
  return fetchApi(`/projects/${projectId}`, {
    method: "DELETE",
  });
};
