import { useDeletePost, useGetPost, useUpdatePost } from "./hooks";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../store";

export const PostPage = () => {
  const { post, isLoading, setSelectedPost } = useGetPost();
  const { deletePost } = useDeletePost();
  const { edit, setEdit, setEditValue, handelSaveEditedPost, editValue } =
    useUpdatePost();

  const user = useContext(UserContext);

  useEffect(() => {
    setEditValue(post);
  }, [post, setEditValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Select a post from the right panel</div>;
  }

  if (editValue) {
    return (
      <form>
        <div className="space-y-5">
          <div className="text-base font-semibold leading-7 text-gray-900 flex justify-between">
            <input
              style={{ backgroundColor: "unset" }}
              value={editValue.title}
              disabled={!edit}
              onChange={(e) =>
                setEditValue((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            ></input>
            <div className="flex gap-3">
              {user?.user.id === post.author.id && !edit && (
                <button onClick={() => setEdit(true)} type="button">
                  Edit
                </button>
              )}
              {user?.user.id === post.author.id && edit && (
                <>
                  <button onClick={handelSaveEditedPost} type="button">
                    Save
                  </button>
                  <button onClick={() => setEdit(false)} type="button">
                    Cancel
                  </button>
                </>
              )}
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
          </div>
          <textarea
            disabled={!edit}
            className="mt-1 min-h-[500px] w-full text-sm leading-6 text-gray-600"
            style={{ backgroundColor: "unset" }}
            onChange={(e) =>
              setEditValue((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            value={editValue.content}
          />
        </div>
      </form>
    );
  }
};
