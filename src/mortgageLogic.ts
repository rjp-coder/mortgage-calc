function calculateMortgate(principal:number,r:number,n:number){
    const tNumerator = principal * r ** n
    const tDenominator = r **n-1
    const tCoefficient = r-1
    
    const t = tNumerator * tCoefficient / tDenominator
    return {monthlyCost:t,totalAmountPayable:t**n,r}
}


/**
 * 
 * @param principal the mortgage amount borrowed
 * @param r the multiplier for the monthly interest rate. E.g if your mortgage rate is 12%, this would be 1.01
 * @param payment the amount to be paid monthly
 */
function generatePaymentsTable(principal,r,payment){
    const data=[];
    let count=0;
    let remaining = principal

    while(remaining>0 && count<100000){
        // let {monthlyCost,r}=m //TODO I don't need this?
        let interest = (r-1)*remaining;
        let nowRemaining = remaining + interest - payment;
        let report = {remaining,interest,payment,nowRemaining}
        for (let key in report){
            if (report.hasOwnProperty(key)){
                report[key]=report[key].toFixed(2)
            }
        }
        data.push(report);
        console.log(report);
        remaining=nowRemaining;
        count++
    }

    return data;

}