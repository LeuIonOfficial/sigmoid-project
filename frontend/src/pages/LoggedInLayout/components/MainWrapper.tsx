import { pageMapper } from "../constants";

export const MainWrapper = ({ link }: { link: string }) => {
 const Content = pageMapper[link]
  
  return <Content />;
};
