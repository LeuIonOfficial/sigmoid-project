import { AuthApi } from "./Authentication";
import { Posts } from "./Posts";

const auth = new AuthApi();
const posts = new Posts()

export const Api = {
  auth,
  posts
};

