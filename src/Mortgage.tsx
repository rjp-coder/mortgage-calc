import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {calculateMortgate,generatePaymentsTable} from './mortgageLogic'

function App() {
  const [principal, setPrincipal] = useState(0)
  const [interest, setInterest] = useState(0)
  const [length, setLength] = useState(0)
  const [payment, setPayment] = useState(0)
  const [results1,setResults1] = useState("")
  const [results2, setResults2] = useState([])


  return (
    <>
    <div style={{backgroundColor:'salmon'}} >
<p style={{color:'black'}}> N.B. This was knocked out in a couple hours and is likely to be inaccurate. This is not  financial advice.</p>

    </div>
      <h1>Mortgage Calculator</h1>
      <h2>Calculate Mortgate</h2>
      <div className="card">
        <label> Principal</label><input type="currency" value={principal} onInput={(e)=>setPrincipal(e.target.value)} ></input>
        <label> Interest</label><input type="number" value={interest} onInput={(e)=>setInterest(e.target.value)}></input>
        <label> Length (years)</label><input type="number" value={length} onInput={(e)=>setLength(e.target.value)} ></input>
        <button onClick={(e)=>{
          e.preventDefault();
          const mortgage = calculateMortgate(principal,1+interest/12/100,length*12)
          setResults1(`Your mortgage of £${principal} with interest rate ${interest}% paid over ${length} years would cost you £${mortgage.monthlyCost.toFixed(2)} per month`)
        }}> Submit</button>
        <h3>{results1}</h3>

      </div>
      <h2>Monthly Payments Table</h2>
      <div className="card">
      <label> Principal</label><input type="currency" value={principal} onInput={(e)=>setPrincipal(e.target.value)} ></input>
      <label> Interest</label><input type="number" value={interest} onInput={(e)=>setInterest(e.target.value)}></input>
      <label> payment</label><input type="currency" value={payment} onInput={(e)=>setPayment(e.target.value)}></input>
      </div>
      <button onClick={(e)=>{
          e.preventDefault();
          const repayments = generatePaymentsTable(+principal,1+interest/12/100,+payment);
          setResults2(repayments);
        }}> Submit</button>
      <table id="results">
        <h3> You would make a total of {results2.length} payments over {Math.floor(results2.length / 12)} years and {results2.length % 12} months</h3>
      <tr><td>Remaining</td><td>Interest</td><td>payment</td><td>Now Remaining</td></tr>
        {
          results2.map((result, i) => (
            <tr key={i}><td>{result.remaining}</td><td>{result.interest}</td><td>{result.payment}</td><td>{result.nowRemaining}</td></tr>
          ))
        }
      </table>

    </>
  )
}

export default App
