import { useMutation, useQuery, useQueryClient } from "react-query";
import { Api } from "../../../../requests";
import { FormEvent, useContext, useState } from "react";
import { SelectedPostContext } from "../../../../store";

export const useGetPost = () => {
  const { selectedPost, setSelectedPost } = useContext(SelectedPostContext);
  const query = () => Api.posts.getPost(selectedPost);

  const {
    isLoading,
    data: post,
    isSuccess,
  } = useQuery(["post", selectedPost], query, {
    select: (response) => {
      return response;
    },
    enabled: !!selectedPost,
  });

  return {
    isLoading,
    isSuccess,
    post,
    setSelectedPost,
  };
};

export const useGetPosts = () => {
  const query = () => Api.posts.getAllPosts();
  const { setSelectedPost } = useContext(SelectedPostContext);

  const {
    isLoading,
    data: posts,
    isSuccess,
  } = useQuery(["posts"], query, {
    select: (response) => {
      return response;
    },
  });

  return {
    isLoading,
    isSuccess,
    posts,
    setSelectedPost,
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
