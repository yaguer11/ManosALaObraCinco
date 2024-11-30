import HeaderWrapper from "./components/HeaderWrapper";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <HeaderWrapper />
      <Outlet />
    </>
  );
}

export default App;
