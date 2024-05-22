import axios from "axios";
import $api from "../ConfigApi";

export const storageKeyAccessToken = "blog_access_token";
export class AuthApi {
  private accessToken: string;

  constructor() {
    this.accessToken = localStorage.getItem(storageKeyAccessToken) ?? "";
  }

  async login(data: Record<string, string>) {
    const response = await axios.post("http://127.0.0.1:8000/api/user/login", {
      email: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      this.accessToken = response.data["access"];
      localStorage.setItem(storageKeyAccessToken, this.accessToken);
      return {
        success: true,
        accessToken: response.data["access"],
        message: response.data.message,
      };
    }
    return {
      success: false,
      accessToken: response.data["error"],
      message: response.data.message,
    };
  }

  async register(data: Record<string, string>) {
    const response = await axios.post("http://127.0.0.1:8000/api/user/register", {
      email: data["email"],
      username: data["username"],
      password: data["password"],
    });

    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    }
    return {
      success: false,
      message: response.data.message,
    };
  }

  async getUser() {
    const response = await $api.get("user/me");

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.data.message,
    };
  }

  async logout() {
    await $api.get("user/logout");
    this.accessToken = "";
    localStorage.removeItem(storageKeyAccessToken);
  }
}
