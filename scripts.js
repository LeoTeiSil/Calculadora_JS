const previousOperationsText = document.querySelector("#previous-operation")
const currentOperationsText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-containers button")

class Calculator {
    constructor(previousOperationsText, currentOperationsText) {
        this.previousOperationsText = previousOperationsText;
        this.currentOperationsText = currentOperationsText;
        this.currentOperation = "";
    }

    // colocar o dígito do úsuario na tela
    addDigit(digit) {
      
        this.currentOperation = digit
        this.updateScreen();
    }

    updateScreen() {
        this.currentOperationsText.innerText += this.currentOperation;
    }
}

const calc = new Calculator(previousOperationsText, currentOperationsText)

// eventos de quando apertar os botões
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

    const value = e.target.innerText;
// diferenciar btn númerico com btn de operação
    if(+value >= 0 || value === ".") {
        console.log(value)
    } else{
        console.log("Op: " + value)
    }
    })
})