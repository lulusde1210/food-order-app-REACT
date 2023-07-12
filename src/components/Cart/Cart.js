import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext, useState } from 'react';
import CartContext from '../../store/card-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from 'axios';
const BASE_URL = 'https://food-order-app-4b3eb-default-rtdb.firebaseio.com/orders.json'


const Cart = (props) => {
    const [order, setOrder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitOrder, setSubmitOrder] = useState(false);
    const cartContext = useContext(CartContext);

    const hasItems = cartContext.items.length > 0;

    const addItemToCartHandler = (id) => {
        const targetItemIdx = cartContext.items.findIndex(item => item.id === id)
        const targetItem = cartContext.items[targetItemIdx]
        const newItem = { ...targetItem, amount: 1 }
        cartContext.addItem(newItem)
    };

    // if use .bind in the component(see line 40,41)
    // const addItemToCartHandler = (item) => {
    //         cartContext.addItem({...item, amount:1})
    // };

    const removeItemToCartHandler = (id) => {
        cartContext.removeItem(id)
    };

    const orderButtonHandler = (e) => {
        setOrder(true)
    };

    const submitOrderHandler = async (userData) => {
        setLoading(true)
        try {
            await axios.post(BASE_URL, {
                user: userData,
                orderedItems: cartContext.items
            })
            setSubmitOrder(true)
        } catch (err) {
            setError(true)
        }
        setLoading(false)
        cartContext.clearItems()

    };

    const cartItems = cartContext.items.map((item) =>
        <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={addItemToCartHandler}
            onRemove={removeItemToCartHandler}
        // or here we can use .bind to bind the onAdd to the item
        //  onAdd={addItemToCartHandler.bind(null, item)}
        //  onRemove={removeItemToCartHandler(null, item.id)}
        // if we use .bind, in cartItem.js we don't need to call the function with id
        // (please check CartItem.js for explaination)
        // and in the above addItemToCartHandler we can just do (see above line 20)
        />)

    const modalActions =
        <div className={classes.actions}>
            <button onClick={props.onCloseCart} className={classes['button--alt']}>close</button>
            {hasItems && <button onClick={orderButtonHandler} className={classes.button}>order</button>}
        </div>


    const cartModalContent =
        <>
            <ul className={classes['cart-items']}>{cartItems}</ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartContext.totalAmount.toFixed(2)}</span>
            </div>
            {order && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
            {!order && modalActions}
        </>

    const errorContent =
        <div>
            <h1>Sorry, there is something wrong on our end, please try later.. </h1>
            <div className={classes.actions}>
                <button onClick={props.onCloseCart} className={classes.button}>close</button>
            </div>
        </div>

    const loadingContent =
        <div>
            <h1>Submitting your order...</h1>
            <div className={classes.actions}>
                <button onClick={props.onCloseCart} className={classes.button}>close</button>
            </div>
        </div>

    const successContent =
        <div>
            <h1>Thank you for submitting your order!!</h1>
            <div className={classes.actions}>
                <button onClick={props.onCloseCart} className={classes.button}>close</button>
            </div>
        </div>

    return (
        <Modal onClick={props.onCloseCart}>
            {!submitOrder && !loading && !error && cartModalContent}
            {loading && loadingContent}
            {error && errorContent}
            {submitOrder && !error && !loading && successContent}
        </Modal>
    )
};

export default Cart;