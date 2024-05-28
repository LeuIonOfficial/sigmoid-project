/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const UserContext = createContext<
  | {
      user: {
        email: string;
        username: string;
        id: string;
      };
    }
  | undefined
>(undefined);

export const SelectedPostContext = createContext({
  selectedPost: "",
  setSelectedPost: (_id: string) => {},
});
