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

export const useGetPosts = (searchParams: string) => {
  const query = () => Api.posts.getAllPosts(searchParams);
  const { setSelectedPost } = useContext(SelectedPostContext);

  const {
    isLoading,
    data: posts,
    isSuccess,
  } = useQuery(["posts", searchParams], query, {
    select: (
      response: {
        title: string;
        content: string;
        author: Record<string, string>;
        id: string;
        date_created: string;
      }[],
    ) => {
      return response.sort(
        (a, b) => +new Date(b.date_created) - +new Date(a.date_created),
      );
    },
    staleTime: 5000,
    keepPreviousData: true,
  });

  return {
    isLoading,
    isSuccess,
    posts,
    searchParams,
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
    },
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

export const useGetUsers = () => {
  const query = () => Api.user.getAllUsers();
  const {
    isLoading,
    data: users,
    isSuccess,
  } = useQuery("users", query, {
    select: (response) => {
      return response;
    },
  });

  return {
    isLoading,
    isSuccess,
    users,
  };
};

export const useUpdatePost = () => {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({
    title: "",
    content: "",
    id: "",
  });
  const queryClient = useQueryClient();

  const mutation = () =>
    Api.posts.updatePost(editValue.id, {
      title: editValue.title,
      content: editValue.content,
    });
  const { mutateAsync } = useMutation(["updatedPost"], mutation, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handelSaveEditedPost = () => {
    setEdit(false);
    mutateAsync();
  };

  return {
    edit,
    setEdit,
    editValue,
    setEditValue,
    handelSaveEditedPost,
  };
};
