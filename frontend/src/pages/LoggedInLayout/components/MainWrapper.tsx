import { pageMapper } from "../constants";
import { Dispatch, SetStateAction } from "react";

export const MainWrapper = ({
  link,
  setSelectedAuthor,
}: {
  link: string;
  setSelectedAuthor: Dispatch<SetStateAction<string>>;
}) => {
  const Content = pageMapper[link];

  return <Content setSelectedAuthor={setSelectedAuthor} />;
};
