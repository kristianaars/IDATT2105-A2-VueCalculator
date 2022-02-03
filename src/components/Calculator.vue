<template>
  <h1>Calculator</h1>

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
      <h3>Calculation log</h3>
      <div id="log-entries">
        <p class="log-entry" v-for="s in this.calculations" :key="s.id">
          {{
            s.firstNumber +
            " " +
            s.operator +
            " " +
            s.secondNumber +
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

export default {
  name: "Calculator",
  data() {
    return {
      displayValue: "0",
      operator: null,
      firstNumber: 0,
      secondNumber: 0,
      clearDisplayNext: false,
    };
  },
  methods: {
    appendToDisplay(char) {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      if (this.displayValue == "0") {
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
      this.firstNumber = 0;
      this.secondNumber = 0;
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
      const currentNumber = parseFloat(this.displayValue)

      if (!operatorExist) {
        this.clearDisplay();
        this.firstNumber = currentNumber
        this.operator = operator
      } else {
        this.secondNumber = currentNumber
        this.calculate()
        this.firstNumber = this.lastAnswer
        this.operator = operator
        this.clearDisplayNext = true
      }

    },
    equalsButton() {
      this.secondNumber = parseFloat(this.displayValue)
      this.calculate()
      this.clearDisplayNext = true
    },
    calculate() {
      this.$store
        .dispatch("calculate", {
          firstNumber: this.firstNumber,
          secondNumber: this.secondNumber,
          operator: this.operator,
        })
        .then(() => {
          this.displayValue = this.lastAnswer;
        })
        .catch((error) => {
          this.displayValue = error;
          this.clearDisplayNext = true;
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
