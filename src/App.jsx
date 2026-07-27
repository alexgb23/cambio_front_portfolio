import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";
import AppRouter from "./router";

function App() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === "POP") return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, navType]);

  return <AppRouter />;
}

export default App;
