class Budget {
    constructor() {
        this.moneyLeft = 190;
        this.display = document.getElementById("budgetDisplay");

        this.displayBudget();
    }
    
    minus(n) {
        this.moneyLeft -= n;
        this.budgetChanged();
    }

    budgetChanged() {
        if (this.moneyLeft <= 0) location.href = "./gameover.html";
        this.displayBudget();
    }

    displayBudget() {
        this.display.textContent = `${this.moneyLeft}€`;
    }
}

export default Budget;