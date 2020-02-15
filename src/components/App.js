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
  const [ counter, setCounter]=useState(0);

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
    from: { marginLeft: '20%', width: '120%', position: 'absolute', opacity: 0, marginTop: '-200%' },
    enter: {position: 'absolute', opacity: 1, marginTop: '0%'  },
    leave: { position: 'absolute', opacity: 0, marginTop: '200%' }
  });

  const handleClick = (e) => {

    setCounter(counter+1);
   
      setQuote(quotes[counter])
    
  };

  return (
    <div className='container'>
      <img src={ron} alt='' className='imgRon' />

      <div className='quote-win'>
        {/* <animated.h1 className='quote'></animated.h1> */}

        {transitions.map(({ item, key, props }) => {
          return (
            <animated.h1 key={key} style={props} className='quote'>
              {quote}
            </animated.h1>
          );
        })}

        <button className='button' onClick={handleClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default App;
