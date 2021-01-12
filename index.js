class LoanCalculator {

    /*
    #
    # loanAmount = The request loan amount (user input)
    # houseValueEstimate  = The value of the house
    # interest: the interest rate, as given in backend (eg: 1.5% / 1.5)
    #
    */
    constructor(loanAmount = 40000, houseValueEsitmate, interest) {
        this.loanAmount = loanAmount
        this.loanLeft = loanAmount
        this.interestRate = interest / 100
        this.monthlyInterestRate = (interest / 100) / 12
        this.houseValue = houseValueEsitmate
        this.total_payment = 0
    }

    Reset() {
        this.loanLeft = this.loanAmount
        this.total_payment = 0

    }


    Amortization(loan_to_value, overMultiple = false) {
        let amortization;
        amortization = loan_to_value > 0.7 ? (0.02 * this.loanAmount) /
            12 : 0
        amortization += loan_to_value < 0.7 && loan_to_value > 0.5 ? (
            0.01 * this.loanAmount) / 12 : 0
        if (overMultiple) amortization += (0.01 * this.loanAmount) / 12
        return amortization
    }

    GetTaxReduction(interest) {
        return interest * 0.7
    }

    GetPaymentAmount(interest, amortization) {
        let amount = (interest + amortization) % 0.5 > 0.5 ? Math.ceil(
            interest + amortization) : interest + amortization
        if (amount % 1 != 0) {
            amount = amount.toFixed(0)
        }
        return amount
    }

    GetInterest(extraInterest = 0) {
        let interest;

        if (extraInterest !== 0) {

            interest = (extraInterest + this.interestRate) * (this
                .loanAmount / 12)

        } else {
            interest = this.loanLeft * this.monthlyInterestRate
        }
        return Math.round(interest.toFixed(1))
    }


    PaymentAmount(overIncomeMultiple) {
        const loan_to_value = this.loanLeft / this.houseValue
        const amortization = Math.round(this.Amortization(loan_to_value,
            overIncomeMultiple))

        const interest = this.GetInterest()

        const interest_plus_1 = this.GetInterest(0.01)
        const interest_plus_2 = this.GetInterest(0.02)
        const interest_plus_3 = this.GetInterest(0.03)

        const interest_post_tax = this.GetTaxReduction(interest);

        const payment_amount = this.GetPaymentAmount(interest,
            amortization)
        const paymeny_amount_post_tax = this.GetPaymentAmount(
            interest_post_tax, amortization)

        //Payment amount but with extra interest rates

        const payment_amount_1 = this.GetPaymentAmount(interest_plus_1,
            amortization)
        const payment_amount_2 = this.GetPaymentAmount(interest_plus_2,
            amortization)
        const payment_amount_3 = this.GetPaymentAmount(interest_plus_3,
            amortization)

        this.total_payment += payment_amount
        this.loanLeft -= amortization

        return {
            interest: interest,
            amortization: amortization,
            total_payment: this.total_payment,
            payment_amount: payment_amount,
            payment_amount_tax: paymeny_amount_post_tax,
            staticData: {
                loanAmount: this.loanAmount,
                houseValue: this.houseValue,
                interest: this.interestRate
            },
            extra_interest_1: payment_amount_1,
            extra_interest_2: payment_amount_2,
            extra_interest_3: payment_amount_3
        }
    }







}


const Calculator = new LoanCalculator(6000000, 10000000, 1.5)

const months_over = []
for (let index = 0; index < 12; index++) {
    const month = Calculator.PaymentAmount(true)
    months_over.push(month)

}

Calculator.Reset()

const months_under = []
for (let index = 0; index < 12; index++) {
    const month = Calculator.PaymentAmount(false)
    months_under.push(month)

}

const table = document.getElementById("table")
const underX = document.getElementById("under")
const overX = document.getElementById("over")
const salary_sample = Math.round(6000000 / 4.5 / 12)
underX.innerHTML = "Över: " + salary_sample.toLocaleString().replace(
    ",",
    ' ') + "kr"
overX.innerHTML = "under: " + salary_sample.toLocaleString().replace(
    ",",
    ' ') + "kr"

const over = table.querySelectorAll("[data-over]")
over.forEach(element => {
    const key = Object.entries(element.attributes)[1][1]
        .nodeName
    if (key === "total_payment") {
        element.innerHTML = months_over[11][key]
            .toLocaleString()
            .replace(",", " ");
        return
    }
    element.innerHTML = months_over[0][key].toLocaleString()
        .replace(",", " ");
});

const under = table.querySelectorAll("[data-under]")
under.forEach(element => {
    const key = Object.entries(element.attributes)[1][1]
        .nodeName
    if (key === "total_payment") {
        element.innerHTML = months_under[11][key]
            .toLocaleString()
            .replace(",", " ");
        return
    }
    element.innerHTML = months_under[0][key].toLocaleString()
        .replace(",", " ");
});
