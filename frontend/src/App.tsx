import {
  LoginPage,
  RegisterPage,
  AuthGuardLayout,
  LoggedInLayout,
} from "./pages";
import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  const DashboardRedirect = () => {
    return <Navigate to={routes.authenticated.dashboard} />;
  };
  return (
    <Routes>
      <Route index element={<DashboardRedirect />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
      <Route path={routes.authenticated.root} element={<AuthGuardLayout />}>
        <Route
          path={routes.authenticated.dashboard}
          element={<LoggedInLayout />}
        />
      </Route>
    </Routes>
  );
};

export default App;
