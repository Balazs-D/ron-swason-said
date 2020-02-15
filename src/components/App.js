import React, { Component } from 'react';
import '../assets/css/style.css';
import Main from './Main';
import axios from 'axios';
import ron from '../Parks&Recreation/ron01.jpg';
import { Transition } from 'react-transition-group';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: 'quote...',
      quotes: []
    };
  }

  componentDidMount() {
    this.doFetch();
  }

  doFetch = async () => {
    const res = await axios(
      'https://ron-swanson-quotes.herokuapp.com/v2/quotes/'
    );

    const quotesArray = res.data;

    this.setState(state => ({ quote: quotesArray }));

    console.log(this.state.quotes);
  };

  render() {
    return (
      <div className='container'>
        <img src={ron} alt='' className='imgRon' />

        <div className='quote-win'>
          <h1 className='quote'>{this.state.quote}</h1>
          <button className='button' onClick={this.doFetch}>
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

export default App;
