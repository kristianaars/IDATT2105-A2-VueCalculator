import ApiService from "@/services/ApiService";

export default {
  calculate(
    calculation: {
      first_number: number;
      operator: string;
      second_number: number;
    },
    token: string
  ) {
    console.log("Posting " + JSON.stringify(calculation) + " to /calculate");
    return ApiService.getApiClient(token).post("/calculation", calculation);
  },

  getCalculations(token: string) {
    return ApiService.getApiClient(token).get("/calculation");
  },
};
