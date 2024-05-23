/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const UserContext = createContext<
  | {
      email: string;
      username: string;
    }
  | undefined
>(undefined);

export const SelectedPostContext = createContext({
  selectedPost: "",
  setSelectedPost: (_id: string) => {},
});
