import Home from "../pages/Home";
import MyProjects from "../pages/MyProjects";
import Settings from "../pages/Settings";
import MyStories from "../pages/MyStories";
import Login from "../pages/Login";
import ProjectDetails from "../pages/ProjectDetails";
import EpicDetails from "../pages/EpicDetails";
import StoryDetails from "../pages/StoryDetails";
import Register from "../pages/Register";

export const routes = [
  { path: "/", element: <Home />, isPrivate: true },
  { path: "/my-projects", element: <MyProjects />, isPrivate: true },
  {
    path: "/my-projects/:projectId",
    element: <ProjectDetails />,
    isPrivate: true,
  },
  {
    path: "/my-projects/:projectId/epics/:epicId",
    element: <EpicDetails />,
    isPrivate: true,
  },
  {
    path: "/my-projects/:projectId/epics/:epicId/story/:storyId",
    element: <StoryDetails />,
    isPrivate: true,
  },
  { path: "/my-stories", element: <MyStories />, isPrivate: true },
  { path: "/settings", element: <Settings />, isPrivate: true },
  { path: "/login", element: <Login />, isPrivate: false },
  { path: "/register", element: <Register />, isPrivate: false },
];
