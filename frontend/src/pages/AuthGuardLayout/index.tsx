import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../store";
import { useGetUser } from "./utils.ts";
import routes from "../../routes";

export const AuthGuardLayout = () => {
  const { isLoading, isSuccess, profile } = useGetUser();

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  if (isSuccess) {
    return (
      <UserContext.Provider value={profile}>
        <Outlet />
      </UserContext.Provider>
    );
  }

  return <Navigate to={routes.login} />;
};
