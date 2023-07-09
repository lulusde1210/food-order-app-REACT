import React from "react";
import { useReducer } from "react";

const initialValue = {
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
}

const CartContext = React.createContext(initialValue);

const intialState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    let existingCartItemIdx;
    let existingCartItem;
    let updatedTotalAmount
    let updatedCartItem
    let updatedItems

    switch (action.type) {
        case "ADD":
            updatedTotalAmount = state.totalAmount + action.payload.amount * action.payload.price
            existingCartItemIdx = state.items.findIndex(item => item.id === action.payload.id)
            existingCartItem = state.items[existingCartItemIdx]; //return true or null(not existing)

            if (existingCartItem) {
                updatedCartItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount
                }
                updatedItems = [...state.items]
                updatedItems[existingCartItemIdx] = updatedCartItem
            } else {
                updatedItems = state.items.concat(action.payload)
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }

        case "REMOVE":
            existingCartItemIdx = state.items.findIndex(item => item.id === action.payload)
            existingCartItem = state.items[existingCartItemIdx];
            updatedTotalAmount = state.totalAmount - existingCartItem.price

            if (existingCartItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.payload)
            } else {
                updatedCartItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount - 1
                }
                updatedItems = [...state.items]
                updatedItems[existingCartItemIdx] = updatedCartItem
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }

        default: return state
    }
}


export function CartProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, intialState)

    const addItemHandler = (item) => {
        dispatchCartAction({ type: 'ADD', payload: item })
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', payload: id })
    }

    return (
        <CartContext.Provider value={{
            items: cartState.items,
            totalAmount: cartState.totalAmount,
            addItem: addItemHandler,
            removeItem: removeItemHandler
        }}>
            {props.children}
        </ CartContext.Provider >
    )
}


export default CartContext;