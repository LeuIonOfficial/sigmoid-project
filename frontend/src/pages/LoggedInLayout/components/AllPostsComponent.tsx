import { useDeletePost, useGetPosts } from "./hooks";
import { TrashIcon } from "@heroicons/react/24/outline";

export const AllPostsComponent = () => {
  const { posts, isLoading, isSuccess } = useGetPosts();
  const { deletePost } = useDeletePost();
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
                className=" border-b border-gray-900/10 py-2"
              >
                <div className="flex justify-between items-center">
                  {" "}
                  <h2 className="font-medium">{el.title}</h2>{" "}
                  <TrashIcon
                    className="w-[24px] cursor-pointer"
                    onClick={() => deletePost(el.id)}
                  />
                </div>
                <p>{el.content}</p>
                <span>Created by: {el.author}</span>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};
