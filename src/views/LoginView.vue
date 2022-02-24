<template>
  <div class="content-container" @submit.prevent="this.submit">
    <form>
      <h1>Login</h1>
      <BasicInput label="Username" v-model="username" :error="InputErrorBind" />
      <BasicInput label="Password" v-model="password" type="password" :error="InputErrorBind" />

      <button>Log In</button>

      <div v-if="LoginError">
        <p>{{ LoginError }}</p>
        <RouterLink to="/register">Want to register a new user?</RouterLink>
      </div>
    </form>

  </div>
</template>

<script>
import BasicInput from "@/components/BasicInput";
import AuthenticationService from "@/services/AuthenticationService.js";
import router from "@/router";

export default {
  name: "LoginView",
  components: { BasicInput },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      console.log(
        "Logging in with username '" +
          this.username +
          "' and password '" +
          this.password +
          "'"
      );
      AuthenticationService.authenticate(this.username, this.password)
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
            this.$store.commit("CLEAR_LOGIN_ERROR");
            console.log("Login successful!");

            router.push("/")

          } else {
            // Login failed ☹️
            this.$store.commit("SET_LOGGED_IN_USER", {
              username: "",
              password: "",
            });
            this.$store.commit(
              "SET_LOGIN_ERROR",
              "Wrong username or password..."
            );
            this.$store.commit("CLEAR_WELCOME_MESSAGE");
            console.log("Unable to log you in.");
          }
        })
        .catch((error) => {
          console.log("Error sending login-request");
          console.error(error);

          this.$store.commit("CLEAR_LOGGED_IN_USER");
          this.$store.commit(
            "SET_LOGIN_ERROR",
            "Unable to contact login-server..."
          );
          this.$store.commit("CLEAR_WELCOME_MESSAGE");
        });
    },
  },
  computed: {
    LoginError() {
      return this.$store.getters.loginError
    },
    InputErrorBind() {
      if(this.LoginError) {
        return " "
      } else {
        return ""
      }
    }
  }
};
</script>

<style scoped>
textarea {
  border: 1px solid #838383;
  border-radius: 3px;
  padding: 8px;
}
</style>
