import React from 'react'
import { Icon } from '@iconify/react';
import classes from './CartButton.module.css';
import CartContext from '../../store/card-context';
import { useContext, useEffect, useState } from 'react';

const CartButton = ({ buttonClickHandler }) => {
    const [isBtnBump, setIsBtnBump] = useState(false);

    const cartContext = useContext(CartContext)

    const numberofCartItems = cartContext.items.reduce((currNum, item) => {
        return currNum + item.amount
    }, 0);

    const btnClassName = `${classes.button} ${isBtnBump ? classes.bump : ''}`

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return
        }
        setIsBtnBump(true);
        const timer = setTimeout(() => {
            setIsBtnBump(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }

    }, [cartContext.items])


    return (
        <button
            onClick={buttonClickHandler}
            className={btnClassName}
        >
            <span className={classes.icon}>
                <Icon icon="mdi:cart-outline" />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberofCartItems}</span>
        </button>
    )
}

export default CartButton