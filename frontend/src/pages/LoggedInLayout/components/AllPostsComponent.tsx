import { pagesName } from "../constants";
import { useGetPosts } from "./hooks";
import { Dispatch, SetStateAction } from "react";

export const AllPostsComponent = ({
  handleNavigation,
  searchParams,
  selectedAuthor,
}: {
  handleNavigation: (link: string) => void;
  searchParams: string;
  setSelectedAuthor?: Dispatch<SetStateAction<string>>;
  selectedAuthor: string;
}) => {
  const { posts, isLoading, isSuccess, setSelectedPost } = useGetPosts(
    searchParams,
    selectedAuthor,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Failed to load posts</div>;
  }

  return (
    <div>
      <h1 className="mb-2 font-semibold">Articles</h1>
      <div className="max-h-[65vh] overflow-auto">
        {posts?.map((el, index: number) => (
          <div
            key={index.toString()}
            id={index.toString()}
            className=" border-b border-gray-900/10 py-2 cursor-pointer"
            onClick={() => {
              setSelectedPost(el.id);
              handleNavigation(pagesName.post);
            }}
          >
            <div className="flex justify-between items-center">
              {" "}
              <h2 className="font-medium">{el.title}</h2>{" "}
            </div>
            {el.content.length > 100 ? (
              <p>
                {el.content.slice(0, 100)}...{" "}
                <span className="font-semibold">Read more</span>
              </p>
            ) : (
              <p>{el.content}</p>
            )}
            <span>Created by: {el.author.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
