import { useCreatePost } from "./hooks";

export const CreatePostPage = () => {
  const {
    handleSubmitForm,
    handleAskAI,
    formValues,
    setFormValues,
    isAILoading,
  } = useCreatePost();
  return (
    <form onSubmit={handleSubmitForm}>
      <div className="space-y-5">
        <div className="text-base font-semibold leading-7 text-gray-900 flex justify-between">
          <span>Create Post</span>
          <button
            onClick={handleAskAI}
            disabled={isAILoading}
            className="flex w-[200px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
          >
            {isAILoading ? "Loading..." : "Ask AI"}
          </button>
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This page is dedicated for creating a new post.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                  id="title"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Post title..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-8">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <textarea
                  name="content"
                  id="content"
                  value={formValues.content}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Post description..."
                  rows={10}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button
          type="submit"
          className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Post
        </button>
      </div>
    </form>
  );
};
