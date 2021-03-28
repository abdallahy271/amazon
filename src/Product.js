import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
    const [{ basket }, dispatch ] = useStateValue();
    
    const addToBasket = () => {
        //dispatch item into data layer
        //allows us to shoot an action into the data layer
        const findSum = () => {
            if (basket.length === 0)
                return price
            else if (basket.length > 0)
                return basket[basket.length-1].total + price
        }
        dispatch({
                type: 'ADD_TO_BASKET',
                item: {
                    id: id,
                    title: title,
                    image: image,
                    price: price,
                    rating: rating,
                    // total: findSum()
                }
        })
    }

    return (
        <div className='product'>
            <div className="product__info">
                <p> {title} </p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) =>(
                        <p>⭐</p>
                    ))}
                </div>
            </div>
            <img src={image}
                alt='' />
            <button onClick={addToBasket}> Add to Basket</button>
        </div>
    )
}

export default Product
