import { useGetUsers } from "./hooks";
import { Dispatch, SetStateAction } from "react";

export const AuthorsPage = ({
  setSelectedAuthor,
}: {
  setSelectedAuthor: Dispatch<SetStateAction<string>>;
}) => {
  const { users, isLoading, isSuccess } = useGetUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Failed to load authors</div>;
  }

  return (
    <div>
      <h1 className="mb-2 font-semibold">Authors</h1>
      <div className="max-h-[65vh] overflow-auto">
        {users?.map(
          (
            el: { email: string; username: string; id: string },
            index: number,
          ) => (
            <div
              key={index.toString()}
              id={index.toString()}
              className=" border-b border-gray-900/10 py-2 cursor-pointer"
              onClick={() => setSelectedAuthor(el.id)}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-medium">{el.username}</h2>
                <span>{el.email}</span>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
