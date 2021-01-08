
let property_value = 10_000_000
let loan_amount = 6_000_000
let loan_left = loan_amount


class LoanCalculator {

    /*
    #
    # loanAmount = The request loan amount (user input)
    # houseValueEstimate  = The value of the house
    # interest: the interest rate, as given in backend (eg: 1.5% / 1.5)
    #
    */
    constructor(loanAmount, houseValueEsitmate, interest ) {
        this.loanAmount = loanAmount
        this.loanLeft = loanAmount
        this.interestRate = interest / 100
        this.monthlyInterestRate = (interest / 100) / 12
        this.houseValue = houseValueEsitmate
    }


    Amortization(loan_to_value, overMultiple) {
        let amortization;
        amortization = loan_to_value > 0.7 ? ( 0.02 *loan_amount ) / 12:0 
        amortization += loan_to_value < 0.7 && loan_to_value > 0.5 ? ( 0.01* loan_amount ) / 12 : 0
        if (overMultiple) amortization += ( 0.01 * loan_amount ) /12
        return amortization
    }

    PaymentAmount(overIncomeMultiple) {
        const loan_to_value = this.loanLeft / this.houseValue
        const amortization = this.Amortization(loan_to_value, overIncomeMultiple)
        let interest = (this.loanLeft * this.monthlyInterestRate)

        let payment_amount = (interest + amortization) % 0.5 > 0.5 ? Math.ceil(interest + amortization) : interest + amortization
        if (payment_amount % 1 != 0) {
            payment_amount = payment_amount.toFixed(0)
        }
        this.loanLeft -= amortization
        return {
            interest: interest,
            amortization: amortization,
            loanLeft :this.loanLeft,
            ltv : loan_to_value,
            paymentAmount: payment_amount,
            staticData: {
                loanAmount: this.loanAmount,
                houseValue: this.houseValue,
                interest: this.interestRate
            }
        }
    }

    getYear(){
        

    }



    month(){ 

    }

}



const Calculator = new LoanCalculator(6_000_000, 10_000_000, 1.5)
const month = Calculator.PaymentAmount()
console.log(month);