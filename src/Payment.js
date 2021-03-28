import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct'
import { Link, useHistory } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const history = useHistory()
    const [{ basket, user }, dispatch ] = useStateValue();
    const [ disabled, setDisabled ] = useState(true)
    const [ processing, setProcessing ] = useState(false)
    const [ succeeded, setSucceeded ] = useState(false)
    const [ clientSecret, setClientSecret ] = useState(true)
    const [ error, setError ] = useState(null)

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        //generates special stripe secret to charge a customer
        const getClientSecret = async () => {
            const response  = await axios({
                method: 'post',
                //stripe expects the total in a currencies sub-units
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = paymentConfirmation

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        }
        )
    }

    const handleChange = (e) => {
        // Listen for changes in card element 
        // and display errors as customers type card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");

    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} {basket?.length === 1 ? "item" : "items"} </Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>16 Turk street</p>
                        <p>San Francisco, CA</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item => (
                                <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                />
                            )))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                       <form onSubmit={handleSubmit}>
                           <CardElement onChange={handleChange}/>
                           
                           <div className="payment__priceContainer">
                            <CurrencyFormat 
                                    renderText = {(value) => (
                                        <h3>Order Total: {value} </h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'} 
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span> {processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>

                                
                           </div>
                           {error && <div>{error}</div>}
                       </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
