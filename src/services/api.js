const BASE_URL = "http://localhost:3001";

const getToken = () => localStorage.getItem("token");

export const loginUser = (username, password) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Credenciales inválidas. Inténtelo nuevamente.");
    return response.json();
  });
};

export const registerUser = ({ username, password, email, name }) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email, name }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        "Error al registrar usuario. Verifica los datos ingresados."
      );
    }
    return response.json();
  });
};

export const fetchStories = () => {
  return fetch(`${BASE_URL}/stories`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching stories");
    return response.json();
  });
};

export const fetchProjects = () => {
  return fetch(`${BASE_URL}/projects`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching projects");
    return response.json(handleResponse);
  });
};

export const fetchProjectDetails = (projectId) => {
  return fetch(`${BASE_URL}/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching project details");
    return response.json();
  });
};

export const createProject = ({ name, description, owner, members }) => {
  return fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, description, owner, members }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        "Error al crear el proyecto. Verifica los datos ingresados."
      );
    }
    return response.json();
  });
};

export const updateProject = (projectId, { name, description }) => {
  return fetch(`${BASE_URL}/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, description }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error al actualizar el proyecto. Verifica los datos.");
    }
    return response.json();
  });
};

export const deleteProject = (projectId) => {
  return fetch(`${BASE_URL}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        // Intentar obtener el mensaje del backend
        return response.json().then((error) => {
          throw new Error(error.message || "Error al eliminar el proyecto.");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const fetchEpics = (projectId) => {
  return fetch(`${BASE_URL}/projects/${projectId}/epics`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching epics");
    return response.json();
  });
};

export const fetchEpicDetails = (epicId) => {
  return fetch(`${BASE_URL}/epics/${epicId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching epic details");
    return response.json();
  });
};

export const fetchStoriesByEpic = (epicId) => {
  return fetch(`${BASE_URL}/epics/${epicId}/stories`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching stories");
    return response.json();
  });
};

export const fetchStory = (storyId) => {
  return fetch(`${BASE_URL}/stories/${storyId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error fetching story details");
    return response.json();
  });
};

export const fetchTasksByStory = (storyId) => {
  return fetch(`${BASE_URL}/stories/${storyId}/tasks`, {
    headers: { Authorization: `Bearer ${getToken()}` },
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
      Authorization: `Bearer ${getToken()}`,
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
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((response) => {
    if (!response.ok) throw new Error("Error deleting task");
    return response.json();
  });
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token"); // Elimina el token
      window.location.href = "/login"; // Redirige al login
    }
    const error = await response.json();
    throw new Error(error.message || "Error en la solicitud");
  }
  return response.json();
};
