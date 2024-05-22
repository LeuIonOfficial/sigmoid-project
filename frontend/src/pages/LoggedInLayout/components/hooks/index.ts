import { useMutation, useQuery, useQueryClient } from "react-query";
import { Api } from "../../../../requests";
import { FormEvent } from "react";
import $api from "../../../../requests/ConfigApi";

export const useGetPosts = () => {
  const query = () => Api.posts.getAllPosts();

  const {
    isLoading,
    data: posts,
    isSuccess,
  } = useQuery(["psots"], query, {
    select: (response) => {
      return response;
    },
  });

  return {
    isLoading,
    isSuccess,
    posts,
  };
};

export const useCreatePost = () => {
  const query = (data: Record<string, string>) => Api.posts.createPost(data);
  const queryClient = useQueryClient();
  const { mutateAsync: createPost } = useMutation(["createPost"], query, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleAskAI = async () => {
    const question = prompt("Write here the topic you want AI to write about:");
    $api.post("blog/ai", { question });
    console.log(question);
    return;
  }

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatedData = Array.from(formData.entries()).reduce(
      (acc: Record<string, string>, [key, value]) => {
        if (typeof value === "string") {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    createPost(updatedData);
  };

  return { handleSubmitForm, handleAskAI };
};
