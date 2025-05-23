/**
 *
 * @param principal the mortgage amount borrowed
 * @param r the multiplier for the monthly interest rate. E.g if your mortgage rate is 12%, this would be 1.01
 * @param n the number of repayments (your mortgage length in years * 12)
 * @returns
 */
export function calculateMortgate(principal: number, r: number, n: number) {
  const tNumerator = principal * r ** n;
  const tDenominator = r ** n - 1;
  const tCoefficient = r - 1;

  const t = (tNumerator * tCoefficient) / tDenominator;
  return { monthlyCost: t, totalAmountPayable: t ** n, r };
}

/**
 *
 * @param principal the mortgage amount borrowed
 * @param r the multiplier for the monthly interest rate. E.g if your mortgage rate is 12%, this would be 1.01
 * @param payment the amount to be paid monthly
 */
export function generatePaymentsTable(
  principal: number,
  r: number,
  payment: number
) {
  const data = [];
  let count = 0;
  let remaining = principal;

  while (remaining > 0 && count < 10000) {
    // let {monthlyCost,r}=m //TODO I don't need this?
    let interest = (r - 1) * remaining;
    let nowRemaining = remaining + interest - payment;
    let report: { [index: string]: any } = {
      remaining,
      interest,
      payment,
      nowRemaining,
    };
    var key: keyof typeof report;
    for (key in report) {
      if (report.hasOwnProperty(key)) {
        report[key] = report[key].toFixed(0);
      }
    }
    data.push(report);
    console.log(report);
    remaining = nowRemaining;
    count++;
  }

  return data;
}

const principal = 170_851.76;
const rate = 7.24;
//const years = 27;
//let n = years*12
let r = 1 + rate / 12 / 100;
generatePaymentsTable(principal, r, 1202);
