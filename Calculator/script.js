const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let lastResult = "";

const isOperator = (char) => {
  return ["+", "-", "*", "/", "%"].includes(char);
};

const isDisplayFull = (currentOutput, newChar) => {
  return (currentOutput + newChar).length > 15;
};

const isValidExpression = (expression) => {
  for (let i = 0; i < expression.length - 1; i++) {
    if (isOperator(expression[i]) && isOperator(expression[i + 1])) {
      return false;
    }
  }
  if (isOperator(expression[0]) && expression[0] !== "-") return false;
  if (isOperator(expression[expression.length - 1])) return false;

  return true;
};

const formatResult = (result) => {
  if (typeof result === "number") {
    if (Math.abs(result) > 1e15 || (Math.abs(result) < 1e-10 && result !== 0)) {
      return result.toExponential(6) + "E";
    }

    if (Number.isInteger(result)) {
      let resultStr = result.toString();
      if (resultStr.length > 15) {
        return result.toExponential(6) + "E";
      }
      return resultStr;
    }

    let formatted = result.toFixed(10);
    formatted = formatted.replace(/\.?0+$/, "");
    
    if (formatted.length > 15) {
      let decimalPlaces = 15 - Math.floor(result).toString().length - 1;
      if (decimalPlaces < 0) {
        return result.toExponential(6) + "E";
      }
      formatted = result.toFixed(Math.max(0, decimalPlaces));
      formatted = formatted.replace(/\.?0+$/, "");
      if (formatted.length > 15) {
        return result.toExponential(6) + "E";
      }
    }

    return formatted;
  }
  return result;
};

const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "=" && output !== "") {
    try {
      if (!isValidExpression(output)) {
        throw new Error("Invalid expression");
      }

      let result = Function(`"use strict"; return (${output})`)();

      if (!isFinite(result)) {
        throw new Error("Math Error");
      }

      lastResult = formatResult(result);
      output = lastResult;
      display.classList.remove("error");
    } catch (error) {
      output = "Error";
      display.classList.add("error");
      setTimeout(() => {
        output = "";
        display.value = output;
        display.classList.remove("error");
      }, 2000);
    }
  } else if (btnValue === "AC") {
    output = "";
    lastResult = "";
  } else if (btnValue === "DEL") {
    if (output === "Error") {
      output = "";
    } else {
      output = output.toString().slice(0, -1);
    }
  } else {
    if (output === "Error") return;
    
    if (isDisplayFull(output, btnValue)) return;

    if (isOperator(btnValue)) {
      if (output === "" && btnValue !== "-") return;

      if (
        output !== "" &&
        isOperator(output[output.length - 1]) &&
        btnValue !== "-"
      ) {
        output = output.slice(0, -1) + btnValue;
        display.value = output;
        return;
      }
    }

    if (btnValue === ".") {
      if (output === "") {
        output = "0";
      }

      let lastNumber = output.split(/[+\-*/%]/).pop();
      if (lastNumber.includes(".")) return;

      if (isOperator(output[output.length - 1])) {
        if (isDisplayFull(output, "0.")) return;
        output += "0";
      } else {
        if (isDisplayFull(output, ".")) return;
      }
    }

    if (btnValue === "00") {
      if (output === "" || isOperator(output[output.length - 1])) return;
      if (isDisplayFull(output, "00")) return;
    }

    output += btnValue;
  }

  display.value = output;
};

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key >= "0" && key <= "9") {
    calculate(key);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    calculate(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate("=");
  } else if (key === "Escape" || key === "c" || key === "C") {
    calculate("AC");
  } else if (key === "Backspace") {
    e.preventDefault();
    calculate("DEL");
  } else if (key === ".") {
    calculate(".");
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
