import axios from "axios";

const storageKeyAccessToken = "blog_access_token";
export class AuthApi {
  private accessToken: string;

  constructor() {
    this.accessToken = localStorage.getItem(storageKeyAccessToken) ?? "";
  }

  async login(data: Record<string, string>) {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
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
    const response = await axios.post("http://127.0.0.1:8000/api/register", {
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
    const response = await axios.get("http://127.0.0.1:8000/api/me", {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

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
    await axios.get("http://127.0.0.1:8000/api/logout", {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    this.accessToken = "";
    localStorage.removeItem(storageKeyAccessToken);
  }
}
