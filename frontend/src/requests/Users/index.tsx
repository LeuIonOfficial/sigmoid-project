import $api from "../ConfigApi";

export class User {
  async getUserBtId(id: string) {
    const response = await $api.get(`user/${id}`);
    return response.data;
  }

  async getAllUsers() {
    const response = await $api.get("user/");
    return response.data;
  }
}
