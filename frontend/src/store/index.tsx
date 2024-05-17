import { createContext } from "react";

export const UserContext = createContext<
  | {
      email: string;
      username: string;
    }
  | undefined
>(undefined);
