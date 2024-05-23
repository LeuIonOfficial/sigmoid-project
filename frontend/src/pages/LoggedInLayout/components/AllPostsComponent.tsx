import { pagesName } from "../constants";
import { useGetPosts } from "./hooks";

export const AllPostsComponent = ({
  handleNavigation,
}: {
  handleNavigation: (link: string) => void;
}) => {
  const { posts, isLoading, isSuccess, setSelectedPost } = useGetPosts();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Failed to load posts</div>;
  }

  return (
    <div>
      <h1 className="mb-2 font-semibold">Here we display all posts: </h1>
      <div className="max-h-[65vh] overflow-auto">
        {posts.map(
          (
            el: { title: string; content: string; author: string; id: string },
            index: number
          ) => (
            <>
              <div
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
                <span>Created by: {el.author}</span>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};
