<template>
  <div class="content-container">
    <form>
      <h1>Register User</h1>
      <BasicInput label="Full Name" v-model="fullName" type="text" />
      <BasicInput label="Address" v-model="address" type="text" />
      <BasicInput label="Username" v-model="username" type="text" />
      <BasicInput label="Password" v-model="password" type="password" />
      <BasicInput label="Email" v-model="email" type="email" />
      <BasicInput label="Phone" v-model="phone" type="tel" />

      <button>Log In</button>
    </form>

  </div>

</template>

<script>
import BasicInput from "@/components/BasicInput";

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
    };
  },
  components: { BasicInput },
};
</script>

<style scoped>

</style>
