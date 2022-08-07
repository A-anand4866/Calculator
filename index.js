class Calculator{
    constructor(previousDisplay,CurrDisplay){
        this.previousDisplay = previousDisplay
        this.CurrDisplay = CurrDisplay
        this.clear()
    }
    clear(){
        this.curroperand = '';
        this.prevoperand = ''
        this.operation = undefined
    }
    delete(){
        this.curroperand = this.curroperand.toString().slice(0,-1);
    }
    
    appendNumber(number){
        if(number === '.' && this.curroperand.includes('.')) return;
        this.curroperand = this.curroperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.curroperand === '')return;
        if(this.prevoperand != ''){
            this.compute()
        }
        this.operation = operation
        this.prevoperand = this.curroperand
        this.curroperand = ''
    }
    compute(){
        let comptation
        const prev = parseFloat(this.prevoperand)
        const curr = parseFloat(this.curroperand)
        if(isNaN(prev) || isNaN(curr))return
        switch(this.operation){
            case '+':
                comptation = prev + curr;
                break;
            case '-':
                comptation = prev - curr;
                break;
            case '*':
                comptation = prev * curr;
                break;
            case '÷':
                comptation = prev / curr;
                break;
            default:
                return
        }
        this.curroperand = comptation;
        this.operation = undefined;
        this.prevoperand = ''
    }
    getdisplaynumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(integerDigits)){
            intergerDisplay = ''
        }else{
            intergerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0})
        }
        if(decimalDigit != null){
            return `${intergerDisplay}.${decimalDigit}`
        }else{
            return intergerDisplay
        }
    }
    updateDisplay(){
        this.CurrDisplay.innerText = this.getdisplaynumber(this.curroperand);
        if(this.operation != null){
            this.previousDisplay.innerText = `${this.prevoperand} ${this.operation}`
        }else{
            this.previousDisplay.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-numbers]');
const Operations = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const AllClearButton = document.querySelector('[data-all-clear]');
const previousDisplay = document.querySelector('[data-top]');
const CurrDisplay = document.querySelector('[data-curr]');
const deleteButton = document.querySelector('[data-delete]');

const calculator = new Calculator(previousDisplay,CurrDisplay);

numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
Operations.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalButton.addEventListener('click',button =>{
    calculator.compute();
    calculator.updateDisplay();
})
AllClearButton.addEventListener('click',button =>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click',button =>{
    calculator.delete();
    calculator.updateDisplay();
})