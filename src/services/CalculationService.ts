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
    firstNumber: number;
    operator: string;
    secondNumber: number;
  }) {
    return apiClient.post("/calculate", {
      first_number: calculation.firstNumber,
      operator: calculation.operator,
      second_number: calculation.secondNumber
    });
  },
};
