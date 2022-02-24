<template>
  <div id="text-area-input-container">
    <label v-if="label">{{ label }}</label>
    <textarea
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind:class="{ 'input-error': error }"
    />
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "BasicTextAreaInput",
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
  },
};
</script>

<style scoped>

textarea {
  border: 1px solid #838383;
  border-radius: 3px;
  padding: 8px;
}

.input-error {
  border-color: #dc778b;
}

.error-message {
  color: lightcoral;
  padding: 0;
  margin: 0;
}

#text-area-input-container {
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 100px;
}

</style>
