import React, { useState, useEffect, useSprings } from 'react';
import '../assets/css/style.css';
import Main from './Main';
import axios from 'axios';
import ron from '../Parks&Recreation/ron01.jpg';
import { animated, useTransition } from 'react-spring';
// import { CSSTransition, TransitionGroup   } from 'react-transition-group';

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState();

  useEffect(() => {
    doFetch();
  }, []);

  const doFetch = async () => {
    const res = await axios(
      'https://ron-swanson-quotes.herokuapp.com/v2/quotes/55'
    );

    const incomingQuotes = res.data;

    let randomizedQuotes = await incomingQuotes
      .map(a => ({
        sort: Math.random(),
        value: a
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);

    await setQuotes(randomizedQuotes);

    setQuote(incomingQuotes[2]);

    await console.log(randomizedQuotes);
  };

  const transitions = useTransition(quotes, quote, {
    from: { marginTop: '-200%' },
    enter: { marginTop: '0'},
    leave: { marginTop: '200%' }
  });



  return (
    <div className='container'>
      <img src={ron} alt='' className='imgRon' />

      <div className='quote-win'>
        <animated.h1 
        className='quote'
        ></animated.h1>

        {transitions.map(({ item, key, props }) => {

         return <animated.h1 key={key} style={props} className='quote'>{item}</animated.h1>

        })}

        <button className='button' onClick={doFetch}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default App;
