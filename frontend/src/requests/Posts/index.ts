import $api from "../ConfigApi";

export class Posts {
  async getAllPosts() {
    const response = await $api.get("blog/post");
    return response.data;
  }

  async getPost(id: string) {
    const response = await $api.get(`blog/post/${id}`);
    return response.data;
  }

  async createPost(data: Record<string, string>) {
    const response = await $api.post("blog/post", data);
    return response.data;
  }

  async updatePost(id: string, data: Record<string, string>) {
    const response = await $api.put(`blog/post/${id}`, data);
    return response.data;
  }
}
