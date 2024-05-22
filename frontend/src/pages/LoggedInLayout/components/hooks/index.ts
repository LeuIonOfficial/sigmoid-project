import { useMutation, useQuery, useQueryClient } from "react-query";
import { Api } from "../../../../requests";
import { FormEvent, useState } from "react";

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

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const mutation = (id: string) => Api.posts.deletePost(id);
  const { mutateAsync: deletePost } = useMutation(["deletePost"], mutation, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { deletePost };
};

export const useCreatePost = () => {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    title: "",
    content: "",
  });
  const query = (data: Record<string, string>) => Api.posts.createPost(data);
  const askAIQuery = (data: Record<string, string>) => Api.posts.askAI(data);
  const queryClient = useQueryClient();
  const { mutateAsync: createPost } = useMutation(["createPost"], query, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { mutateAsync: askAI, isLoading: isAILoading } = useMutation(
    ["askAI"],
    askAIQuery,
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries();
        setFormValues((prev) => ({
          ...prev,
          content: response,
        }));
      },
    }
  );

  const handleAskAI = async () => {
    const question = prompt("Write here the topic you want AI to write about:");
    if (question) {
      askAI({ question });
    }
    return;
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = {
      ...formValues,
    };
    setFormValues({ title: "", content: "" });

    createPost(updatedData);
  };

  return {
    handleSubmitForm,
    handleAskAI,
    formValues,
    setFormValues,
    isAILoading,
  };
};
