import { fetchApi } from "./api";

export const fetchTasksByStory = (storyId) => {
  return fetchApi(`/stories/${storyId}/tasks`);
};

export const createOrUpdateTask = (taskData, taskId, storyId) => {
  const endpoint = taskId ? `/tasks/${taskId}` : "/tasks";
  const method = taskId ? "PUT" : "POST";

  const bodyData = taskId ? taskData : { ...taskData, story: storyId };

  return fetchApi(endpoint, {
    method,
    body: JSON.stringify(bodyData),
  });
};

export const deleteTask = (taskId) => {
  return fetchApi(`/tasks/${taskId}`, {
    method: "DELETE",
  });
};
