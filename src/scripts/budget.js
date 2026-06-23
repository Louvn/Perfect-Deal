class Budget {
    constructor() {
        this.moneyLeft = 100;
        this.display = document.getElementById("budgetDisplay");

        this.displayBudget();
    }
    
    minus(n) {
        this.moneyLeft -= n;
        this.displayBudget();
    }

    displayBudget() {
        this.display.textContent = `${this.moneyLeft}€`;
    }
}

export default Budget;