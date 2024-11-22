import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteType } from "../types/types";
import Login from "../pages/Login";
import Index from "../pages/Index";

const Providers = () => {
  const routes: RouteType[] = [
    {
      path: "/",
      element: <Index />,
      name: "Index",
    },
    {
      path: "/login",
      element: <Login />,
      name: "Login",
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} element={route.element} path={route.path} />
        ))}
      </Routes>
    </Router>
  );
};

export default Providers;
