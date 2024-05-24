import $api from "../ConfigApi";

export class Posts {
  async getAllPosts(searchParams?: string) {
    const params = searchParams ? { search: searchParams } : {};
    const response = await $api.get(`blog/posts/`, { params });
    return response.data;
  }

  async getPost(id: string) {
    const response = await $api.get(`blog/posts/${id}/`);
    return response.data;
  }

  async createPost(data: Record<string, string>) {
    const response = await $api.post("blog/posts/create/", data);
    return response.data;
  }

  async updatePost(id: string, data: Record<string, string>) {
    const response = await $api.put(`blog/posts/${id}/update/`, data);
    return response.data;
  }

  async deletePost(id: string) {
    const response = await $api.delete(`blog/posts/${id}/delete/`);
    return response.data;
  }

  async askAI(data: Record<string, string>) {
    const response = await $api.post("blog/ask-ai/", data);
    return response.data;
  }
}
