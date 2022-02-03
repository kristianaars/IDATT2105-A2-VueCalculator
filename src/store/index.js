import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
    calculations: [],
  },
  getters: {
    lastAnswer: state => {
      return state.calculations.at(-1).answer
    }
  },
  mutations: {
    PUSH_TO_LOG(state, calculation) {
      state.calculations.push(calculation);
    },
  },
  actions: {
    calculate({ commit }, { firstNumber, operator, secondNumber }) {
      if(operator === null) {
        operator = '+'
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

      if(answer !== 0 && !parseFloat(answer)) {
        console.log("Unable to calculate...")
        return Promise.reject(new Error("Not a number"))
      }

      const calc = {
        firstNumber: firstNumber,
        operator: operator,
        secondNumber: secondNumber,
        answer: answer,
        id: this.state.count++
      }


      console.log(calc)

      commit('PUSH_TO_LOG', calc)
    },
    saveToLog({ commit }, calculation) {

      commit('PUSH_TO_LOG', {
        ...calculation,
        id: this.state.count++
      })
    }
  },
  modules: {},
});
