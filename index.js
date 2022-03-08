const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json("hello there")
})

app.get('/convert', (req, res) => {

  const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {to_currency: req.query.to_currency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: req.query.from_currency},
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
      }
    };

    axios.request(options).then(function (response) {
     
      res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);

    }).catch(function (error) {
      console.error(error);
    });
})

app.get('/news', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://crypto-news-live4.p.rapidapi.com/news',
    headers: {
      'x-rapidapi-host': 'crypto-news-live4.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
  }

  axios.request(options).then( (response) => {
    res.json(response.data)
  }).catch(function (error) {
    console.error(error)  
  });
})

app.listen(8000, () => console.log(`server is running on port ${PORT}`))


