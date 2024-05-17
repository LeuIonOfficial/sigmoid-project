import { Api } from "../../requests";
import { useQuery } from "react-query";

export const useGetUser = () => {
  const query = () => Api.auth.getUser();

  const {
    isLoading,
    data: profile,
    isSuccess,
  } = useQuery(["user-profile"], query, { select: (data) => data.data });

  return {
    isLoading,
    profile,
    isSuccess,
  };
};
