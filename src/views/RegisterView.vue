<template>
  <div class="content-container" @submit.prevent="this.submit">
    <form>
      <h1>Register User</h1>
      <BasicInput label="Full Name" v-model="fullName" type="text" />
      <BasicInput label="Address" v-model="address" type="text" />
      <BasicInput label="Username" v-model="username" type="text" />
      <BasicInput label="Password" v-model="password" type="password" />
      <BasicInput label="Email" v-model="email" type="email" />
      <BasicInput label="Phone" v-model="phone" type="tel" />

      <button data-testid="register-button">Register</button>

      <p v-if="successMessage" data-testid="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" data-testid="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import BasicInput from "@/components/BasicInput";
import AccountService from "@/services/AccountService.ts";

export default {
  name: "RegisterView",
  data() {
    return {
      fullName: "",
      address: "",
      username: "",
      password: "",
      email: "",
      phone: "",

      successMessage: "",
      errorMessage: "",
    };
  },
  components: { BasicInput },
  methods: {
    async submit() {
      await AccountService.register({
        fullName: this.fullName,
        address: this.address,
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
      })
        .then((response) => {
          const responseStatus = response.data.registerStatus;

          if (responseStatus === "Success") {
            this.successMessage = "User successfully created!";
          } else {
            this.errorMessage = "Error creating user.";
          }
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
  },
};
</script>

<style scoped></style>
