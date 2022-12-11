const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const prevText = document.querySelector("[data-previous-operand]");
const currentText = document.querySelector("[data-current-operand]");

let currentOperand = "",
  previousOperand = "",
  operation = undefined;

const clear = () => {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
};

const deleteNum = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
};

const appendNum = (number) => {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand + number;
};

const chooseOperation = (opt) => {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculation();
  }
  operation = opt;
  previousOperand = currentOperand;
  currentOperand = "";
};

const calculation = () => {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "÷":
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result;
  operation = undefined;
  previousOperand = "";
};

const DisplayNumber = (number) => {
  const strNum = number.toString();
  const intNum = parseFloat(strNum.split(".")[0]);
  const decimalNum = strNum.split(".")[1];
  let integerDisplay;


  if (isNaN(intNum)) {
    integerDisplay = "";
  } else {
    integerDisplay = intNum.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalNum != null) {
    return `${integerDisplay}.${decimalNum}`;
  } else {
    return integerDisplay;
  }
};

const updateDisplay = () => {
  currentText.innerText = DisplayNumber(currentOperand);
  if (operation != null) {
    prevText.innerText = `${DisplayNumber(previousOperand)} ${operation}`;
  } else {
    prevText.innerText = "";
  }
};

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    appendNum(button.innerText);
    updateDisplay();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculation();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  clear();
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  deleteNum();
  updateDisplay();
});
