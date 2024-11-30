import { fetchApi } from "./api";

export const fetchStories = () => {
  return fetchApi("/stories");
};

export const fetchStoriesByEpic = (epicId) => {
  return fetchApi(`/epics/${epicId}/stories`);
};

export const fetchStoryDetails = (storyId) => {
  return fetchApi(`/stories/${storyId}`);
};

export const createStory = (storyData) => {
  return fetchApi("/stories", {
    method: "POST",
    body: JSON.stringify(storyData),
  });
};

export const updateStory = (storyId, storyData) => {
  return fetchApi(`/stories/${storyId}`, {
    method: "PUT",
    body: JSON.stringify(storyData),
  });
};

export const deleteStory = (storyId) => {
  return fetchApi(`/stories/${storyId}`, {
    method: "DELETE",
  });
};
