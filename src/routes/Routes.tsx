import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RouteType } from "../types/types";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

const RouteProvider = () => {
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
    <Main>
      <Sidebar>
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} element={route.element} path={route.path} />
            ))}
          </Routes>
        </Router>
      </Sidebar>
    </Main>
  );
};

export default RouteProvider;
