import classes from './CartItem.module.css';

const CartItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={() => props.onRemove(props.id)}>-</button>
                <button onClick={() => props.onAdd(props.id)}>+</button>
            </div>
        </li >
    );
};

// for line 16 and 17, if we use .bind in its parent component (Cart.js) 
// we don't need to call onRemove and onAdd with props.id, because it is already binded
// we can simply do
//              <button onClick={() => props.onRemove}>-</button>
//              <button onClick={() => props.onAdd}>+</button>

export default CartItem;