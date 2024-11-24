const BASE_URL = "https://lamansysfaketaskmanagerapi.onrender.com/api";

const getToken = () => localStorage.getItem("token");

export const loginUser = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Credenciales inválidas. Inténtelo nuevamente.");
    return response.json();
  });
};

export const fetchStories = () => {
  return fetch(`${BASE_URL}/stories`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching stories");
    return response.json();
  });
};

export const fetchProjects = () => {
  return fetch(`${BASE_URL}/projects`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching projects");
    return response.json();
  });
};

export const fetchProjectDetails = (projectId) => {
  return fetch(`${BASE_URL}/projects/${projectId}`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching project details");
    return response.json();
  });
};

export const fetchEpics = (projectId) => {
  return fetch(`${BASE_URL}/projects/${projectId}/epics`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching epics");
    return response.json();
  });
};

export const fetchEpicDetails = (epicId) => {
  return fetch(`${BASE_URL}/epics/${epicId}`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching epic details");
    return response.json();
  });
};

export const fetchStoriesByEpic = (epicId) => {
  return fetch(`${BASE_URL}/epics/${epicId}/stories`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching stories");
    return response.json();
  });
};

export const fetchStory = (storyId) => {
  return fetch(`${BASE_URL}/stories/${storyId}`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching story details");
    return response.json();
  });
};

export const fetchTasksByStory = (storyId) => {
  return fetch(`${BASE_URL}/stories/${storyId}/tasks`, {
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching tasks");
    return response.json();
  });
};

export const createOrUpdateTask = (taskData, currentTaskId, storyId) => {
  const url = currentTaskId
    ? `${BASE_URL}/tasks/${currentTaskId}`
    : `${BASE_URL}/tasks`;
  const method = currentTaskId ? "PUT" : "POST";

  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Auth: `${getToken()}`,
    },
    body: JSON.stringify({ ...taskData, story: storyId }),
  }).then((response) => {
    if (!response.ok) throw new Error("Error saving task");
    return response.json();
  });
};

export const deleteTask = (taskId) => {
  return fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { Auth: `${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error deleting task");
    return response.json();
  });
};
