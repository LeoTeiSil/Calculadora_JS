const previousOperationsText = document.querySelector("#previous-operation");
const currentOperationsText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-containers button");

class Calculator {
    constructor(previousOperationsText, currentOperationsText) {
        this.previousOperationsText = previousOperationsText;
        this.currentOperationsText = currentOperationsText;
        this.currentOperation = "";
    }

    // Colocar o dígito do usuário na tela
    addDigit(digit) {
        // Impedir que o usuário coloque mais de um ponto
        if (digit === "." && this.currentOperationsText.innerText.includes(".")) {
            return;
        }

        this.currentOperation += digit;
        this.updateScreen();
    }

    // Processar as operações
    processOperation(operation) {

        // Checar se current está vazio
        if (this.currentOperationsText.innerText === "" && operation != "C") {
            if (this.previousOperationsText.innerText !== "") {
                // Mudança de operação
                this.changeOperation(operation);
            }
            return;
        }

        // Fazer a previsão do valor final
        let operationValue;
        const previous = +this.previousOperationsText.innerText.split(" ")[0];
        const current = +this.currentOperationsText.innerText;

        // Verifique se há uma operação anterior válida e se o valor atual não é nulo
        if (!isNaN(previous) && !isNaN(current)) {
            switch (operation) {
                case "+":
                    operationValue = previous + current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "-":
                    operationValue = previous - current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "/":
                    operationValue = previous / current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "*":
                    operationValue = previous * current;
                    this.updateScreen(operationValue, operation, current, previous);
                    break;
                case "DEL":
                    this.processDelOperator();
                    break;
                case "CE":
                    this.processClearOperation();
                    break;
                case "C":
                    this.processClearCurrentOperation();
                    break;
                case "=":
                    this.processEqualOperation();
                    break;
                default:
                    return;
            }
        }
    }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperationsText.innerText = this.currentOperation;
        } else {
            // Checar se o valor anterior é 0 e não há operação ainda
            if (previous === 0) {
                operationValue = current;
            }

            // Atualizar o texto da operação anterior com o resultado e a operação
            this.previousOperationsText.innerText = `${operationValue} ${operation}`;
            this.currentOperationsText.innerText = "";
            this.currentOperation = "";
        }
    }

    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];
        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationsText.innerText = this.previousOperationsText.innerText.slice(0, -1) + operation;
    }

    // Deleta dígito
    processDelOperator() {
        this.currentOperationsText.innerText = this.currentOperationsText.innerText.slice(0, -1);
        this.currentOperation = this.currentOperation.slice(0, -1);
    }

    // limpar a operação current
    processClearOperation() {
        this.currentOperationsText.innerText = ""
        this.currentOperation = "";
    }

    // limpar toda a operação
    processClearCurrentOperation() {
        previousOperationsText.innerText = ""
        this.previousOperations = "";
        currentOperationsText.innerText = ""
        this.currentOperation = "";
    }

    // processar a operação
    processEqualOperation() {
        const operation = previousOperationsText.innerText.split(" ")[1]

        this.processOperation(operation);
    }
} 

const calc = new Calculator(previousOperationsText, currentOperationsText);

// Eventos de quando apertar os botões
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        // Diferenciar botão numérico de botão de operação
        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
