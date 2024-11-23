import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import MyProjects from "../src/pages/MyProjects";
import Settings from "../src/pages/Settings";
import MyStories from "../src/pages/MyStories";
import Login from "../src/pages/Login";
import ProjectDetails from "../src/pages/ProjectDetails";
import EpicDetails from "../src/pages/EpicDetails";
import StoryDetails from "../src/pages/StoryDetails";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  // Verifica si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem("token");

  // Obtiene el título y si se muestra el botón de retroceso en el Header
  const getTitleAndShowBack = () => {
    switch (location.pathname) {
      case "/":
        return { title: "Inicio", showBack: false };
      case "/my-projects":
        return { title: "Mis Proyectos", showBack: false };
      case "/my-stories":
        return { title: "Mis Historias", showBack: false };
      case "/settings":
        return { title: "Ajustes", showBack: false };
      default:
        return { title: "Detalles", showBack: true };
    }
  };

  // Determina si debe mostrarse el Header (no se muestra en "/login")
  const shouldShowHeader = location.pathname !== "/login";

  return (
    <>
      {shouldShowHeader && <Header {...getTitleAndShowBack()} />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {/* Rutas privadas */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route
              path="/my-projects/:projectId"
              element={<ProjectDetails />}
            />
            <Route
              path="/my-projects/:projectId/epics/:epicId"
              element={<EpicDetails />}
            />
            <Route
              path="/my-projects/:projectId/epics/:epicId/story/:storyId"
              element={<StoryDetails />}
            />
            <Route path="/my-stories" element={<MyStories />} />
            <Route path="/settings" element={<Settings />} />
          </>
        )}

        {/* Redirección predeterminada */}
        {isAuthenticated ? (
          <Route path="*" element={<Navigate to="/" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;
