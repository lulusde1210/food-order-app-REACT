import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/card-context';
import CartItem from './CartItem';


const Cart = (props) => {
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


    return (
        <Modal onClick={props.onCloseCart}>
            <ul className={classes['cart- items']}>{cartItems}</ul>
            <div className={classes.total}>
                <span>total amount</span>
                <span>${cartContext.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCloseCart} className={classes['button--alt']}>close</button>
                {hasItems && <button className={classes.button}>order</button>}
            </div>
        </Modal>
    )
};

export default Cart;