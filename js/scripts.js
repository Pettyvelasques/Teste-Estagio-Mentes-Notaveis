const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
        this.clearScreen = true;
        this.resultScreen = false
    }


    addDigit(digit) {
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        if (digit >= 0 && this.resultScreen === true) {
            this.currentOperationText.innerText = "";
            this.currentOperationText.innerText = digit;
            this.resultScreen === false;
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operation) {
        let hideOperation = ""
        let verifyOperation = (this.previousOperationText.innerText.split(" ")[1]);
        let fixOperation = operation;

        if (this.currentOperationText.innerText === "0") {
            return;
        }
        else if (this.previousOperationText.innerText !== "0" && operation !== "=" && operation !== "C/AC" && operation !== "ON" && verifyOperation !== operation) {
            operation = verifyOperation;
        }
        else if (this.clearScreen === true && operation !== "C/AC" && operation !== "ON" && operation !== "=") {
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);

                hideOperation = this.currentOperationText.innerText;
                this.currentOperationText.innerText = ""
                setTimeout(() => {
                    this.currentOperationText.innerText = hideOperation;
                }, 100);


            }
            return;
        }

        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                operation = fixOperation;
                this.updateScreen(operationValue, operation, current, previous);
                this.resultScreen === false
                break;
            case "-":
                operationValue = previous - current;
                operation = fixOperation;
                this.updateScreen(operationValue, operation, current, previous);
                this.resultScreen === false
                break;
            case "*":
                operationValue = previous * current;
                operation = fixOperation;
                this.updateScreen(operationValue, operation, current, previous);
                this.resultScreen === false
                break;
            case "/":
                operationValue = previous / current;
                operation = fixOperation;
                this.updateScreen(operationValue, operation, current, previous);
                this.resultScreen === false
                break;
            case "C/AC":
            case "ON":
                this.clearOperator();
                this.resultScreen === false
                break;
            case "=":
                this.equalOperator();
                break;
            default:
                return;
        }
    }
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null && this.clearScreen === true) {
            this.currentOperationText.innerText = "";
            this.currentOperationText.innerText += this.currentOperation;
            this.clearScreen = false;
        }
        else if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        }
        else {
            if (previous === 0) {
                operationValue = current;
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = operationValue;
            this.clearScreen = true;
            this.resultScreen = false;
        }
    }

    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];

        if (!mathOperations.includes(operation) && this.clearScreen === false) {
            return;
        }


        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    clearOperator() {
        if (this.currentOperationText.innerText = this.previousOperationText.innerText && this.clearScreen === true) {

            this.currentOperationText.innerText = "0";
            this.previousOperationText.innerText = "0";
            this.clearScreen = true
            this.resultScreen = false;
            return
        }
        else {
            this.currentOperationText.innerText = "0";
            this.previousOperationText.innerText = "0";
            this.clearScreen = true
            this.resultScreen = false;
            return
        }
    }

    equalOperator() {
        const operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
        this.previousOperationText.innerText = "0";
        this.clearScreen = false;
        this.resultScreen = true;
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (value === "%" || value === "MU" || value === "MR" || value === "MC" || value === "M-" || value === "M+" || value === "???" || value === "+/-") {
            return;
        }
        else if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        }
        else {
            calc.processOperation(value);
        }
    });
});