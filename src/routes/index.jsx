import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import MyProjects from "../pages/MyProjects";
import ProjectDetails from "../pages/ProjectDetails";
import EpicDetails from "../pages/EpicDetails";
import StoryDetails from "../pages/StoryDetails";
import MyStories from "../pages/MyStories";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-projects",
        element: (
          <ProtectedRoute>
            <MyProjects />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-projects/:projectId",
        element: (
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-projects/:projectId/epics/:epicId",
        element: (
          <ProtectedRoute>
            <EpicDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-projects/:projectId/epics/:epicId/story/:storyId",
        element: (
          <ProtectedRoute>
            <StoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-stories",
        element: (
          <ProtectedRoute>
            <MyStories />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
