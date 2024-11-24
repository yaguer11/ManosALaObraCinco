import { useLocation } from "react-router-dom";

const useHeaderConfig = () => {
  const location = useLocation();

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

export default useHeaderConfig;
