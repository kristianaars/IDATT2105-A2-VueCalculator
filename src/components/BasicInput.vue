<template>
  <div id="container">
    <label v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind:class="{ 'input-error': error }"
      :type="type"
    />
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "BasicInput",
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    error: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style scoped>
#container {
  text-align: left;
  display: grid;
  grid-column: auto;
  grid-gap: 4px;
}

input {
  border: 1px solid #838383;
  border-radius: 3px;
  padding: 8px;
}

.error-message {
  color: lightcoral;
  padding: 0;
  margin: 0;
}

.input-error {
  border-color: #dc778b;
}
</style>
