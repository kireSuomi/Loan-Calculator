
let property_value = 10_000_000
let loan_amount = 8_000_000
let loan_left = loan_amount

function getAmortization(loan_to_value, overMultiple = false){
   // let amortization  = ( loan_to_value > 0.7? (0.02 *loan_amount) /12:0 ) + ((loan_to_value < 0.7 &&loan_to_value > 0.5)?(0.01*loan_amount)/12:0) + (0.01*loan_amount)/12
   
    let amortization;
    amortization = loan_to_value > 0.7 ? ( 0.02 *loan_amount ) / 12:0 
    amortization += loan_to_value < 0.7 && loan_to_value > 0.5 ? ( 0.01* loan_amount ) / 12 : 0
    if (overMultiple) amortization += ( 0.01 * loan_amount ) /12
    amortization = Math.round(amortization)
    return amortization
}


function getMonth(month = 1){

}

//Under 4.5
function calcUnder(showAmor) {


    let loan_to_value =  (loan_left / property_value).toFixed(2)
    
    let clean_loan_to_value = (loan_to_value * 100 ) + "%"
    let clean_interest_rate = 1.5 //
    
    let interest_rate = clean_interest_rate / 100
    let monthly_interest_rate = interest_rate / 12


    let interest = (loan_left * monthly_interest_rate)
    

    //Make sure its the correct rounding (same as the excel doc) https://docs.google.com/spreadsheets/d/1HHPALfN8jDn6dj74pNZQ7nULFRRO-C-tWqPCDfJn6gw/edit#gid=1743341663
    if (typeof interest == 'float') {
      interest = interest.toFixed()
    }

    let amortization = getAmortization(loan_to_value)
    let payment_amount = Math.floor(interest + amortization, false)
    console.log("Interest: " + interest.toLocaleString());
    console.log("Interest ce: " + interest.toFixed().toLocaleString());
    //console.log("Loan to value (r): " + loan_to_value);

    console.log('Loan To value: ' + clean_loan_to_value);

    if (showAmor)    console.log("Amortization: " + amortization.toLocaleString());

    console.log("Payment Amount: " + payment_amount.toLocaleString());
    console.log("Loan Amount: " + loan_left);
    console.log(" ");
    loan_left -= amortization






        // console.log(`Property value: ` + property_value)
        // console.log(`Loan amount: ` + loan_amount);
        
        // console.log(`Interestrate: ` + clean_interest_rate);
 
}


function getOver(){

}




x = 10
while (x > 0) {
    x  === 0 ? calcUnder(true) : calcUnder()
    x--
}




