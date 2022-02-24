<template>
  <div class="content-container" @submit.prevent="this.submit">
    <form>
      <h1>Login</h1>
      <BasicInput label="Username" v-model="username" :error="InputErrorBind" />
      <BasicInput label="Password" v-model="password" type="password" :error="InputErrorBind" />

      <button>Log In</button>

      <p>{{ LoginError }}</p>
    </form>
  </div>

</template>

<script>
export default {
  name: "RegisterView"
}
</script>

<style scoped>

</style>
