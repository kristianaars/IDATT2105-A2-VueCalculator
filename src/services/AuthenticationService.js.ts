import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8085/demo",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  authenticate(username: string, password: string) {
    return apiClient.post("/login", { username: username, password: password });
  },
};
