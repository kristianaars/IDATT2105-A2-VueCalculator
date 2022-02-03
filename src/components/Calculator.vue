<template>
  <h1>Calculator</h1>

  <div id="main-container">
    <div id="calculator-container">
      <p id="display">25</p>

      <div id="button-grid">
        <!-- First button row -->
        <button class="calculator-button function-button">C</button>
        <button class="calculator-button function-button">ANS</button>
        <button class="calculator-button function-button">DEL</button>
        <button class="calculator-button operation-button">+</button>

        <!-- Second button row -->
        <button class="calculator-button">1</button>
        <button class="calculator-button">2</button>
        <button class="calculator-button">3</button>
        <button class="calculator-button operation-button">-</button>

        <!-- Third button row -->
        <button class="calculator-button">4</button>
        <button class="calculator-button">5</button>
        <button class="calculator-button">6</button>
        <button class="calculator-button operation-button">x</button>

        <!-- Fourth button row -->
        <button class="calculator-button">7</button>
        <button class="calculator-button">8</button>
        <button class="calculator-button">9</button>
        <button class="calculator-button operation-button">/</button>

        <!-- Fifth button row -->
        <button class="calculator-button"></button>
        <button class="calculator-button">0</button>
        <button class="calculator-button">,</button>
        <button class="calculator-button operation-button">=</button>
      </div>

    </div>

    <div id="log-container">
      <h3>Calculation log</h3>
      <textarea id="log">

      </textarea>
    </div>
  </div>

</template>

<script>
require("@/assets/styles/calculator.css");

export default {
  name: "Calculator",
  actions: {

  }
};
</script>

<style scoped src="@/assets/styles/calculator.css" />
