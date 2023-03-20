let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector("controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;

// Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
  // Two random values between 1 and 20
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
  console.log(num1, num2);

  // To get random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];
  console.log(randomOperator);

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  // Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}`);
  console.log(num1, randomOperator, num2, solution);

  // To place the input at random positions
  // (1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
  let randomInpt = randomValue(1, 5);
  console.log(randomInpt);

  if (randomInpt == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`
  } else if (randomInpt == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"\> = ${solution}`
  } else if (randomInpt == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="number" id="inputValue" placeholder="?"\> ${num2} = ${solution}`
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`
  }

  // User Input Check
  submitBtn.addEventListener("click", () => {
    errorMessage.classList.add("hide");
    let userInput = document.getElementById("inputValue").value;
    // If user input is not empty
    if(userInput) {
      // If the user guess is correct
      if(userInput == answerValue) {
        stopGame(`Yesssir! <span>Correct</span> Answer`)
      }
      // If user input operator is other than +,-,*
      else if (operatorQuestion && !operators.includes(userInput)) {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Please enter a valid operator";
      }
      // If user guess is wrong
      else {
        stopGame(`Opps! <span>Wrong</span> Answer`);
      }
    }
    // If user input is empty
    else {

    }
  })

};
  
// Start Game
startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  questionGenerator();
})

// Stop Game
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerHTML = "Restart";
  // controls.classList.remove("hide");
  // startBtn.classList.add("hide");
}