
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
    
    GetTaxReduction(interest){
        if (this.loanAmount > 100_000) {
            return interest * 0.79;
        } else {
            return interest * 0.7
        }
    }

    GetPaymentAmount(interest, amortization) {
        let amount = (interest + amortization) % 0.5 > 0.5 ? Math.ceil(interest + amortization) : interest + amortization
        if (amount % 1 != 0) {
            amount = payment_amount.toFixed(0)
        }
        return amount
    }

    GetInterest(extraInterest = 0){
        let interest;

        if (extraInterest !== 0) {
            interest = this.loanLeft * (this.monthlyInterestRate + extraInterest)
        } else {
            interest = this.loanLeft * this.monthlyInterestRate
        }
        return interest
    }


    PaymentAmount(overIncomeMultiple) {
        const loan_to_value = this.loanLeft / this.houseValue
        const amortization = this.Amortization(loan_to_value, overIncomeMultiple)
        const interest = this.GetInterest()

        const interest_plus_1 = this.GetInterest(0.01)
        const interest_plus_2 = this.GetInterest(0.02)
        const interest_plus_3 = this.GetInterest(0.03)

        const interest_post_tax = this.GetTaxReduction(interest);
    
        const payment_amount = this.GetPaymentAmount(interest, amortization)
        const paymeny_amount_post_tax = this.GetPaymentAmount(interest_post_tax, amortization)

        //Payment amount but with extra interest rates
        const payment_amount_1 = this.GetPaymentAmount(interest_plus_1, amortization)
        const payment_amount_2 = this.GetPaymentAmount(interest_plus_2, amortization)
        const payment_amount_3 = this.GetPaymentAmount(interest_plus_3, amortization)

        //this.loanLeft -= amortization
        return {
            interest: interest,
            interest_post_tax: interest_post_tax,
            amortization: amortization,
            //loanLeft :this.loanLeft,
            ltv : loan_to_value,
            paymentAmount: payment_amount,
            paymentAmountTax: paymeny_amount_post_tax,
            staticData: {
                loanAmount: this.loanAmount,
                houseValue: this.houseValue,
                interest: this.interestRate
            },
            extraInterest:  {
                extraInterest1: payment_amount_1,
                extraInterest2: payment_amount_2,
                extraInterest3: payment_amount_3
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
const month2 = Calculator.PaymentAmount(true)
console.log(month);
console.log(month2);