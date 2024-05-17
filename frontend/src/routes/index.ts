const authenticatedRoot = "/u";

const routes = {
  authenticated: {
    root: authenticatedRoot,
    dashboard: authenticatedRoot + "/dashboard",
    author: authenticatedRoot + "/author",
  },
  login: "/login",
  register: "/register",
  notFound: "*",
  badRequest: "/400",
};

export default routes;
