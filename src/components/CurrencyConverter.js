import ExchangeRate from "./ExchangeRate";
import axios from "axios";
import {useState} from 'react'

const CurrencyConverter = () => {

  

  const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(0)


  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: 'BTC',
    secondaryCurrency: 'BTC',
    exchangeRate: 0
  })

  const convert = () => {

   const options = {
      method: 'GET',
      url: 'http://localhost:8000/convert',
      params: {to_currency: chosenSecondaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: chosenPrimaryCurrency},
   
    };

    axios.request(options).then(function (response) {
     
      setResult(response.data * amount);
     

      setExchangedData({
        primaryCurrency : chosenPrimaryCurrency,
        secondaryCurrency: chosenSecondaryCurrency, 
        exchangeRate: response.data
      })

    }).catch(function (error) {
      console.error(error);
    });
  }

  return ( 
  <div className="currency-converter">
    <h2>Currency Converter</h2>
    
    <div className="input-box">
    <table>
      <tbody>
        <tr>
          <td>Primary Currency</td>
          <td>
            <input type="number" name="currency-amount-1" value={amount} 
            onChange = {(e) => setAmount(e.target.value)}
            />
          </td>
          <td>
            <select name="currency-option-1" className="currency-options" value={chosenPrimaryCurrency}
            onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
            >
            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Secondary Currency</td>
          <td>
            <input type="number" name="currency-amount-1" value={result}  
          
            disabled={true}
            />
          </td>
          <td>
            <select name="currency-option-1" className="currency-options" value={chosenSecondaryCurrency}
            onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
            >
            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <button id="convert-button" onClick={convert}>Convert</button>
    </div>
    
    <ExchangeRate 
      exchangedData = {exchangedData}
    />
  </div> );
}
 
export default CurrencyConverter;