import { AuthApi } from "./Authentication";
import { Posts } from "./Posts";
import { User } from "./Users";

const auth = new AuthApi();
const posts = new Posts();
const user = new User();

export const Api = {
  auth,
  posts,
  user,
};
