import Header from "../Header";
import useHeaderConfig from "../../hooks/useHeaderConfig";
import { useLocation } from "react-router-dom";

const HeaderWrapper = () => {
  const { pathname } = useLocation();
  const shouldShowHeader = pathname !== "/login";
  const headerConfig = useHeaderConfig();

  return shouldShowHeader ? <Header {...headerConfig} /> : null;
};

export default HeaderWrapper;
