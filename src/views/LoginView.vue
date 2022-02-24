<template>
  <div class="content-container" @submit.prevent="this.submit">
    <form>
      <h1>Login</h1>
      <BasicInput label="Username" v-model="username" :error="InputErrorBind" />
      <BasicInput
        label="Password"
        v-model="password"
        type="password"
        :error="InputErrorBind"
      />

      <button @click="submit" data-testid="submit-button" id="submit-button">Log In</button>

      <div v-if="this.LoginError">
        <p id="error-message" data-testid="error-message">{{ this.LoginError }}</p>
        <RouterLink to="/register">Want to register a new user?</RouterLink>
      </div>
    </form>
  </div>
</template>

<script>
import BasicInput from "@/components/BasicInput";
import AccountService from "@/services/AccountService.ts";
import router from "@/router";

export default {
  name: "LoginView",
  components: { BasicInput },
  data() {
    return {
      username: "",
      password: "",
      LoginError: "",
    };
  },
  methods: {
    async submit() {
      console.log(
        "Logging in with username '" +
          this.username +
          "' and password '" +
          this.password +
          "'"
      );
      await AccountService.authenticate(this.username, this.password)
        .then((response) => {
          const loginStatus = response.data.loginStatus;

          if (loginStatus === "Success") {
            // Login success 🥳
            this.$store.commit("SET_LOGGED_IN_USER", {
              username: this.username,
              password: this.password,
            });
            this.$store.commit(
              "SET_WELCOME_MESSAGE",
              "You have successfully logged in."
            );
            this.LoginError = ""
            console.log("Login successful!");

            router.push("/");
          } else {
            // Login failed ☹️
            this.$store.commit("SET_LOGGED_IN_USER", {
              username: "",
              password: "",
            });
            this.LoginError = "Wrong username or password..."
            this.$store.commit("CLEAR_WELCOME_MESSAGE");
            console.log("Unable to log you in.");
          }
        })
        .catch((error) => {
          console.log("Error sending login-request");

          this.$store.commit("CLEAR_LOGGED_IN_USER");
          this.LoginError = "Unable to contact login-server..."
          this.$store.commit("CLEAR_WELCOME_MESSAGE");
          console.log(error);
        });
    },
  },
  computed: {
    InputErrorBind() {
      if (this.LoginError) {
        return " ";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
textarea {
  border: 1px solid #838383;
  border-radius: 3px;
  padding: 8px;
}
</style>
