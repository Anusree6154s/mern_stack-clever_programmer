class Bank {
    constructor(balance) {
        this.balance = balance
    }

    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount
            return this.balance
        } else {
            console.log("not enough balance")
        }
    }

    deposit(amount) {
        return this.balance += amount
    }
}

const input = document.querySelector("input")
const deposit = document.getElementById("deposit")
const withdraw = document.getElementById("withdraw")
const span = document.querySelector("span")

const bank = new Bank(0)

span.innerText = 0
console.log(input.value)
console.log(deposit)
console.log(withdraw)
console.log(span)

deposit.onclick = () => {
    const money = Number(input.value)
    span.innerText = bank.deposit(money)
}

withdraw.onclick = () => {
    const money = Number(input.value)
    span.innerText = bank.withdraw(money)

}