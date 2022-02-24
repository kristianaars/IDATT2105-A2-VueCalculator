<template>
  <div>
    <h1>Calculator</h1>
    <h3 v-if="loggedInUser">Hello {{ loggedInUser }}!</h3>
    <p v-if="welcomeMessage">{{ welcomeMessage }}</p>
    <Calculator />
  </div>
</template>

<script>
import Calculator from "@/components/Calculator.vue";

export default {
  name: "CalculatorHome",
  components: {
    Calculator,
  },
  computed: {
    welcomeMessage() {
      return this.$store.getters.loginWelcome;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
