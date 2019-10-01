import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
var NumberFormat = require('react-number-format');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      myInputValue : "1"
    };
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS,LTC,XRP,BCH&tsyms=EUR')
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({cryptos: cryptos});
      })
  }

  render() {
    return (
      <div className="App">
        <input
            className="champ"
            type="text"
            placeholder="Entre Montant a Convertir"
            onChange={e => this.setState({myInputValue: e.target.value})}></input>
        {Object.keys(this.state.cryptos).map((key) => (

          <div id="crypto-container">
            
            <span className="left">{key}</span>
            <span className="right"><NumberFormat value={this.state.cryptos[key].EUR*this.state.myInputValue} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'€'} /></span>
          </div>

        ))}
      </div>
    );
  }
}

export default App;
