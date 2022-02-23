<template>
  <div id="contact-form-container">
    <form id="contact-form" @submit.prevent="this.submit">
      <div>
        <label>Name</label>
        <input type="text" v-model="name" />
        <p class="error" v-if="errors.name">{{ errors.name }}</p>
      </div>

      <div>
        <label>E-Mail</label>
        <input type="email" v-model="email" />
        <p class="error" v-if="errors.email">{{ errors.email }}</p>
      </div>

      <div>
        <label>Message</label>
        <textarea id="message-box" v-model="message"></textarea>
        <p class="error" v-if="errors.message">{{ errors.message }}</p>
      </div>

      <button :disabled="!meta.valid || isSubmitting">Submit</button>
      <p id="status-message">{{ submitState }}</p>
    </form>
  </div>
</template>

<script>
import { useField, useForm, configure } from "vee-validate";
import { string, object } from "yup";
import { useStore } from "vuex";

export default {
  name: "ContactView",
  data() {
    return {
      state: "",
    };
  },
  computed: {
    submitState() {
      return this.$store.getters.contactFormState;
    },
  },
  setup() {
    configure({
      validateOnChange: true,
    });

    const store = useStore();

    const validationSchema = object({
      name: string()
        .required()
        .matches(/^(\w+ +)+\b(\w)+$/, "Please enter your full name"),
      email: string().email("Please enter a valid email"),
      message: string().required("Please enter a message"),
    });

    const { handleSubmit, errors, meta, isSubmitting, resetForm } = useForm({
      validationSchema,
      initialValues: {
        email: store.getters.email,
        name: store.getters.name,
      },
    });

    const { value: name } = useField("name");
    const { value: email } = useField("email");
    const { value: message } = useField("message");

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    const submit = handleSubmit(async (values) => {
      // Mock send request of 1 second
      store.commit("SET_CONTACT_FORM_STATE", "Submitting...");

      store.commit("SET_CONTACT_INFO", { name: name, email: email });

      await sleep(1000)
        .then(() => {
          store.commit("SET_CONTACT_FORM_STATE", "Submitted!");
          console.log(values);
        })
        .catch((error) => {
          store.commit("SET_CONTACT_FORM_STATE", "Error submitting. " + error);
          console.log(error);
          this.state = "";
        })
        .finally(() => {
          resetForm({
            values: {
              email: store.getters.email,
              name: store.getters.name,
              message: "",
            },
          });
        });
    });

    return {
      name,
      email,
      message,
      errors,
      submit,
      meta,
      isSubmitting,
    };
  },
};
</script>

<style scoped>
#contact-form-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

#contact-form {
  min-width: 200px;
  max-width: 350px;
  width: 80%;
  display: grid;
  grid-column: auto;
  grid-gap: 10px;
  text-align: left;
}

#contact-form div {
  display: flex;
  flex-direction: column;
}

#message-box {
  resize: none;
  height: 150px;
  min-width: 280px;
}

#status-message {
  margin: 0;
  color: #ababab;
}

.error {
  color: lightcoral;
  padding: 0;
  margin: 0;
}


</style>
