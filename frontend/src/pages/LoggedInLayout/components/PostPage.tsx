import { useDeletePost, useGetPost } from "./hooks";

export const PostPage = () => {
  const { post, isLoading, setSelectedPost } = useGetPost();
  const { deletePost } = useDeletePost();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Select a post from the right panel</div>;
  }

  if (post) {
    return (
      <form>
        <div className="space-y-5">
          <div className="text-base font-semibold leading-7 text-gray-900 flex justify-between">
            <span>{post.title}</span>
            <button
              type="button"
              onClick={() => {
                deletePost(post.id);
                setSelectedPost("");
              }}
            >
              Delete
            </button>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">{post.content}</p>
        </div>
      </form>
    );
  }
};
