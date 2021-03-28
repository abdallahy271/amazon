import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Payment from './Payment';
import Login from './Login';
import Orders from './Orders';

import  { auth } from './firebase'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// To get Stripe-js: npm i @stripe/stripe-js
// npm install @stripe/react-stripe-js

const promise = loadStripe('pk_test_51IZpSIBqs6Wtkhf8X9TInZioQnDboGz2NKdozQwIeXXAlhNt09hOtB55Gf1fY750UcwhgeqZ3VQJe03qBI1CyXNg00brhnqQgd')

function App() {
  const [{}, dispatch ] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser){

        dispatch({
          type: 'SET_USER',
          user: authUser

        })

      } else {
        dispatch({
          type: 'SET_USER',
          user: null

        })
      }
    })
  }, [])

  return (
    <Router>
    <div className="app">
    
      <Switch>
      <Route path='/orders'>
            <Header />
            <Orders />
        </Route>
      <Route path='/login'>
            <Login />
        </Route>
        <Route path='/checkout'>
        <Header />
            {/* Ctrl spacebar to autoimport */}
            <Checkout />
        </Route>
        <Route path='/payment'>
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path='/'>
          <Header />
            <Home />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
