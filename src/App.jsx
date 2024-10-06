import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../src/pages/Home";
import MyProjects from "../src/pages/MyProjects";
import Settings from "../src/pages/Settings";
import MyStories from "../src/pages/MyStories";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  const getTitleAndShowBack = () => {
    switch (location.pathname) {
      case "/":
        return { title: "Home", showBack: false };
      case "/my-projects":
        return { title: "My Projects", showBack: false };
      case "/my-stories":
        return { title: "My Stories", showBack: false };
      case "/settings":
        return { title: "Settings", showBack: false };
      default:
        return { title: "Task Manager", showBack: true };
    }
  };
  return (
    <>
      <Header {...getTitleAndShowBack()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/my-stories" element={<MyStories />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
