<template>
  <div id="contact-form-container">

    <form id="contact-form" @submit.prevent="this.submit">
      <div id="header-text">
        <h1>Contact us!</h1>
        <p>We would love to hear what your think of our calculator app! Please fill in the form below and we will get back to you as soon as possible.</p>
      </div>

      <BasicInput v-model="name" label="Name" :error="errors.name" />

      <BasicInput v-model="email" label="E-Mail" :error="errors.email" />

      <BasicTextAreaInput
        id="message-box"
        v-model="message"
        label="Message"
        :error="errors.message"
      />

      <button :disabled="!meta.valid || isSubmitting">Submit</button>
      <p id="status-message">{{ submitState }}</p>
    </form>
  </div>
</template>

<script>
import BasicInput from "@/components/BasicInput";
import BasicTextAreaInput from "@/components/BasicTextAreaInput";

import { useField, useForm, configure } from "vee-validate";
import { string, object } from "yup";
import { useStore } from "vuex";

export default {
  name: "ContactView",
  components: { BasicInput, BasicTextAreaInput },
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
      validateOnChange: false,
      validateOnBlur: false,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });

    const store = useStore();

    const validationSchema = object({
      name: string()
        .required()
        .matches(/^(\w+ +)+\b(\w)+$/, "Please enter your full name"),
      email: string().required("An email is required").email("Please enter a valid email"),
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

<style>
#header-text {
  margin-bottom: 12px;
}

#header-text h1 {
  margin-bottom: 0px;
}

#contact-form-container {
  display: flex;
  justify-content: center;
  width: 100%;
}


#contact-form {
  min-width: 200px;
  max-width: 550px;
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

#contact-form button {
  margin-top: 16px;
  height: 32px;
  border: solid 1px black;
  background: white;
  border-radius: 16px;
}

#contact-form button:disabled {
  border: solid 1px #919191;
  background: #f1f1f1;
}

#contact-form button:enabled:hover {
  cursor: pointer;
  scale: 1.015;
  background: #f8f8f8;
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

</style>
