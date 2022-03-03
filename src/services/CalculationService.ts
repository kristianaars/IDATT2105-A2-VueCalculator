import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8085/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export default {
  calculate(calculation: {
    first_number: number;
    operator: string;
    second_number: number;
  }) {
    console.log("Posting " + JSON.stringify(calculation) + " to /calculate")
    return apiClient.post("/calculate", calculation);
  },
};
