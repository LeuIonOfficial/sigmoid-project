import { useGetPosts } from "./hooks";

export const AllPostsComponent = () => {
  const { posts, isLoading, isSuccess } = useGetPosts();
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
            el: { title: string; content: string; author: string },
            index: number,
          ) => (
            <>
              <div
                id={index.toString()}
                className="cursor-pointer border-b border-gray-900/10 py-2"
              >
                <h2 className="font-medium">{el.title}</h2>
                <p>{el.content}</p>
                <span>Created by: {el.author}</span>
              </div>
            </>
          ),
        )}
      </div>
    </div>
  );
};
