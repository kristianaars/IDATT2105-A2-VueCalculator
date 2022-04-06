import axios from "axios";

export default {
  getApiClient(token: string) {
    return axios.create({
      baseURL: "http://localhost:8085/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
};
