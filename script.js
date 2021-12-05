//challenge-1

function ageConverter() {
  var birthYear = prompt("Enter birth year:");
  var currentYear = prompt("Enter current year:");
  var ageInDays = (currentYear - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDays + " days old"
  );
  h1.setAttribute("id", "ageConverter");
  h1.appendChild(textAnswer);
  document.getElementById("result").appendChild(h1);
}

function reset() {
  document.getElementById("ageConverter").remove();
}

//challenge-2

class Calculator {
  constructor(previousElement, currentElement) {
    this.previousElement = previousElement;
    this.currentElement = currentElement;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.previous = "";
  }

  updateDisplay() {
    this.currentElement.innerText = this.current;
    this.previousElement.innerText = this.previous;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousElement = document.querySelector("[data-previous]");
const currentElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousElement, currentElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

//Challenge-3

let count = 0;

function increment() {
  count++;
  console.log(count);
  document.getElementById("counter").innerText = count;
}

function reset() {
  let countStr = " " + count + " - ";
  count = 0;
  console.log(count);
  document.getElementById("counter").innerText = 0;
  document.getElementById("save-el").innerText = "PREVIOUS ENTRIES: ";
}

function save() {
  let countStr = " " + count + " - ";
  document.getElementById("save-el").innerText += countStr;
}

//challenge-4

let userScore = 0;
let computerScore = 0;
let userScoreSpan = document.getElementById("user-score");
let computerScoreSpan = document.getElementById("computer-score");
let scoreBoardDiv = document.querySelector(".score-board");
let resultP = document.querySelector(".result>p");
let rockDiv = document.getElementById("r");
let paperDiv = document.getElementById("p");
let scissorsDiv = document.getElementById("s");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  let randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function converter(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  if (letter === "s") return "Scissors";
}

function win(user, computer) {
  userScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultP.innerHTML =
    "Results: " +
    converter(user) +
    " beats " +
    converter(computer) +
    ". You Win!";
}

function lose(user, computer) {
  computerScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultP.innerHTML =
    "Results: " +
    converter(computer) +
    " beats " +
    converter(user) +
    ". You Lose!";
}

function draw(user, computer) {
  resultP.innerHTML =
    "Results: " + converter(user) + " and " + converter(computer) + ". Draw!";
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      
      break;
    case "sr":
    case "rp":
    case "ps":
      lose(userChoice, computerChoice);
      
      break;
  }
}

function main() {
  rockDiv.addEventListener("click", () => {
    game("r");
    
  });
  paperDiv.addEventListener("click", () => {
    game("p");
    
  });
  scissorsDiv.addEventListener("click", () => {
    game("s");
    
  });
}

main();

