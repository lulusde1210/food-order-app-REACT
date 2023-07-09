import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';


const MealItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true)
    const amountInputRef = useRef();


    const submitHandler = (e) => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNum = +enteredAmount
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNum <= 0 ||
            enteredAmountNum > 5
        ) {
            setIsAmountValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNum);

    };

    return (
        <form className={classes.form} onSubmit={submitHandler} noValidate>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button> + Add</button>
            {!isAmountValid && <p>please enter a valid amount 1-5</p>}
        </form>
    )
};

export default MealItemForm;
