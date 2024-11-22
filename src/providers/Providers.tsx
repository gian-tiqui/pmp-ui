import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteType } from "../types/types";
import Login from "../pages/Login";

const Providers = () => {
  const routes: RouteType[] = [
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
