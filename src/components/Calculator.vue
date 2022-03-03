<template>
  <div id="main-container">
    <div id="calculator-container">
      <p id="display">{{ this.displayValue }}</p>

      <div id="button-grid">
        <!-- First button row -->
        <button
          class="calculator-button function-button"
          @click="this.clearCalculator"
        >
          C
        </button>
        <button
          class="calculator-button function-button"
          @click="this.useLastAnswer"
        >
          ANS
        </button>
        <button class="calculator-button function-button" @click="backspace">
          DEL
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === '+' }"
          @click="applyOperator('+')"
        >
          +
        </button>

        <!-- Second button row -->
        <button class="calculator-button" @click="this.appendToDisplay('1')">
          1
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('2')">
          2
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('3')">
          3
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === '-' }"
          @click="applyOperator('-')"
        >
          -
        </button>

        <!-- Third button row -->
        <button class="calculator-button" @click="this.appendToDisplay('4')">
          4
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('5')">
          5
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('6')">
          6
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === 'x' }"
          @click="applyOperator('x')"
        >
          x
        </button>

        <!-- Fourth button row -->
        <button class="calculator-button" @click="this.appendToDisplay('7')">
          7
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('8')">
          8
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('9')">
          9
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === '/' }"
          @click="applyOperator('/')"
        >
          /
        </button>

        <!-- Fifth button row -->
        <button class="calculator-button" @click="this.invertDisplayValue">
          +/-
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('0')">
          0
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('.')">
          ,
        </button>
        <button
          class="calculator-button operation-button"
          @click="this.equalsButton"
        >
          =
        </button>
      </div>
    </div>

    <div id="log-container">
      <h2>Calculation log</h2>
      <div id="log-entries">
        <p class="log-entry" v-for="s in this.calculations" :key="s.id">
          {{
            s.first_number +
            " " +
            s.operator +
            " " +
            s.second_number +
            " = " +
            s.answer
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
require("@/assets/styles/calculator.css");
import CalculationService from "@/services/CalculationService";

export default {
  name: "Calculator",
  data() {
    return {
      displayValue: "0",
      operator: null,
      first_number: 0,
      second_number: 0,
      clearDisplayNext: false,
    };
  },
  methods: {
    appendToDisplay(char) {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      if (char == "." && this.displayValue.includes(".")) {
        return;
      }

      if (this.displayValue == "0" && char != ".") {
        this.displayValue = char;
      } else {
        this.displayValue += char;
      }
    },
    backspace() {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      this.displayValue = (this.displayValue + "").slice(0, -1);

      if ((this.displayValue + "").length === 0 || this.displayValue == "-") {
        this.clearDisplay();
      }
    },
    clearDisplay() {
      this.displayValue = 0;
      this.clearDisplayNext = false;
    },
    clearCalculator() {
      this.clearDisplay();
      this.clearCalculation();
    },
    clearCalculation() {
      this.operator = null;
      this.first_number = 0;
      this.second_number = 0;
    },
    invertDisplayValue() {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      if (this.displayValue.startsWith("-")) {
        this.displayValue = this.displayValue.slice(
          1,
          this.displayValue.length
        );
      } else {
        this.displayValue = "-" + this.displayValue;
      }
    },
    applyOperator(operator) {
      const operatorExist = this.operator !== null;
      const currentNumber = parseFloat(this.displayValue);

      if (!operatorExist) {
        this.clearDisplay();
        this.first_number = currentNumber;
        this.operator = operator;
      } else {
        this.second_number = currentNumber;
        this.calculate();
        this.first_number = this.lastAnswer;
        this.operator = operator;
        this.clearDisplayNext = true;
      }
    },
    equalsButton() {
      this.second_number = parseFloat(this.displayValue);
      this.calculate();
      this.clearCalculation();
      this.clearDisplayNext = true;
    },
    calculate() {
      CalculationService.calculate({
        first_number: this.first_number,
        operator: this.operator,
        second_number: this.second_number,
      })
        .then((response) => {
          console.log(
            "Received the following response from server: " +
              JSON.stringify(response)
          );

          this.displayValue = response.data.answer;
          this.$store.dispatch("saveToLog", {
            ...response.data.calculation,
            answer: response.data.answer,
          });
        })
        .catch((error) => {
          console.error(
              "Received the following response from server: " +
              JSON.stringify(error)
          );
          this.displayValue = error;
        });
    },
    useLastAnswer() {
      this.displayValue = this.lastAnswer;
    },
  },
  computed: {
    calculations() {
      return this.$store.state.calculations;
    },
    lastAnswer() {
      return this.$store.getters.lastAnswer;
    },
  },
};
</script>

<style scoped src="@/assets/styles/calculator.css" />
