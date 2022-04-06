import { createStore } from "vuex";


export default createStore({
  state: {
    loginCredentials: {
      username: "",
      token: "",
    },
    loginError: "",
    loginWelcome: "",
    contactFormState: "",
    contactFormInformation: {
      name: "",
      email: "",
    },
    calculations: [
      { first_number: 0.0, operator: "+", second_number: 0.0, answer: 0.0 },
    ],
  },
  getters: {
    lastAnswer: (state) => {
      return state.calculations[state.calculations.length - 1].answer;
    },
    email: (state) => {
      return state.contactFormInformation.email;
    },
    name: (state) => {
      return state.contactFormInformation.name;
    },
    contactFormState: (state) => {
      return state.contactFormState;
    },
    loginWelcome: (state) => {
      return state.loginWelcome;
    },
    loginError: (state) => {
      return state.loginError;
    },
    loginState: (state) => {
      return state.loginCredentials.token != "";
    },
    loggedInUser: (state) => {
      return state.loginCredentials.username;
    },
  },
  mutations: {
    PUSH_TO_LOG(state, calculation: any) {
      console.log(calculation)
      state.calculations.push(calculation);
    },
    SET_CONTACT_INFO(state, contactInfo: { name: string; email: string }) {
      state.contactFormInformation = contactInfo;
    },
    SET_CONTACT_FORM_STATE(state, stateText: string) {
      state.contactFormState = stateText;
      console.log(state.contactFormState);
    },
    SET_LOGGED_IN_USER(
      state,
      credentials: { username: string; token: string }
    ) {
      state.loginCredentials = credentials;
    },
    CLEAR_LOGGED_IN_USER(state) {
      state.loginCredentials = { username: "", token: "" };
    },
    SET_LOGIN_ERROR(state, error: string) {
      state.loginError = error;
    },
    CLEAR_LOGIN_ERROR(state) {
      state.loginError = "";
    },
    SET_WELCOME_MESSAGE(state, message: string) {
      state.loginWelcome = message;
    },
    CLEAR_WELCOME_MESSAGE(state) {
      state.loginWelcome = "";
    },
  },
  actions: {
    saveToLog({ commit }, calculation) {
      console.log(calculation)
      commit("PUSH_TO_LOG", {
        ...calculation,
        id: this.state.calculations.length,
      });
    },
  },
  modules: {},
});
