import { createStore } from "vuex";

interface calculation {
  firstNumber: number;
  operator: string;
  secondNumber: number;
}

export default createStore({
  state: {
    contactFormState: "",
    contactFormInformation: {
      name: "",
      email: "",
    },

    calculations: [
      { firstNumber: 0, operator: "+", secondNumber: 0, answer: 0 },
    ],
  },
  getters: {
    lastAnswer: (state) => {
      return state.calculations[-1];
    },
    email: (state) => {
      return state.contactFormInformation.email;
    },
    name: (state) => {
      return state.contactFormInformation.name;
    },
    contactFormState: (state) => {
      return state.contactFormState;
    }
  },
  mutations: {
    PUSH_TO_LOG(state, calculation: any) {
      state.calculations.push(calculation);
    },
    SET_CONTACT_INFO(state, contactInfo: { name: string; email: string }) {
      state.contactFormInformation = contactInfo;
    },
    SET_CONTACT_FORM_STATE(state, stateText: string) {
      state.contactFormState = stateText;
      console.log(state.contactFormState);
    },
  },
  actions: {
    calculate({ commit }, { firstNumber, operator, secondNumber }) {
      if (operator === null) {
        operator = "+";
      }

      let answer;
      switch (operator) {
        case "+":
          answer = firstNumber + secondNumber;
          break;
        case "-":
          answer = firstNumber - secondNumber;
          break;
        case "x":
          answer = firstNumber * secondNumber;
          break;
        case "/":
          answer = firstNumber / secondNumber;
          break;
      }

      if (answer !== 0 && !parseFloat(answer)) {
        console.log("Unable to calculate...");
        return Promise.reject(new Error("Not a number"));
      }

      const calc = {
        firstNumber: firstNumber,
        operator: operator,
        secondNumber: secondNumber,
        answer: answer,
      };

      console.log(calc);

      commit("PUSH_TO_LOG", calc);
    },
    saveToLog({ commit }, calculation) {
      commit("PUSH_TO_LOG", {
        ...calculation,
        id: this.state.calculations.length,
      });
    },
  },
  modules: {},
});
