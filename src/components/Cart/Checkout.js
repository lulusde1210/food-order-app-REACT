import classes from './Checkout.module.css';
import useInput from '../../hooks/useInput';
import { useState } from 'react';

const isNotEmpty = value => value.trim().length > 0;
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const {
        value: nameEnteredValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueInputBlurHandler: nameBlurHandler,
        valueInputChangeHandler: nameChangeHandler,
        resetInput: nameReset,
    } = useInput(isNotEmpty)

    const {
        value: streetEnteredValue,
        isValid: streetIsValid,
        hasError: streetHasError,
        valueInputBlurHandler: streetBlurHandler,
        valueInputChangeHandler: streetChangeHandler,
        resetInput: streetReset,
    } = useInput(isNotEmpty)

    const {
        value: cityEnteredValue,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueInputBlurHandler: cityBlurHandler,
        valueInputChangeHandler: cityChangeHandler,
        resetInput: cityReset,
    } = useInput(isNotEmpty)

    const {
        value: postalEnteredValue,
        isValid: postalIsValid,
        hasError: postalHasError,
        valueInputBlurHandler: postalBlurHandler,
        valueInputChangeHandler: postalChangeHandler,
        resetInput: postalReset,
    } = useInput(isFiveChars)

    // console.log("namehaserror:", nameHasError)
    // console.log("streethaserror:", streetHasError)
    // console.log("postalhaserror:", postalHasError)
    // console.log("cityhaserror:", cityHasError)



    const confirmHandler = (e) => {
        e.preventDefault();

        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postalCode: postalIsValid,
        });

        const formIsValid =
            nameIsValid &&
            streetIsValid &&
            cityIsValid &&
            postalIsValid;

        if (!formIsValid) {
            return;
        }

        const userData = {
            name: nameEnteredValue,
            street: streetEnteredValue,
            city: cityEnteredValue,
            postalCode: postalEnteredValue
        }
        props.onConfirm(userData)
        nameReset();
        streetReset();
        postalReset();
        cityReset();
    };

    const inputNameClasses = `${classes.control} ${nameHasError || !formInputsValidity.name ? classes.invalid : ''}`
    const inputStreetClasses = `${classes.control} ${streetHasError || !formInputsValidity.street ? classes.invalid : ''}`
    const inputPostalClasses = `${classes.control} ${postalHasError || !formInputsValidity.postalCode ? classes.invalid : ''}`
    const inputCityClasses = `${classes.control} ${cityHasError || !formInputsValidity.city ? classes.invalid : ''}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={inputNameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    value={nameEnteredValue}
                    id='name'
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {(nameHasError || !formInputsValidity.name) && <p>Please enter your name!</p>}
            </div>
            <div className={inputStreetClasses}>
                <label htmlFor='street'>Street</label>
                <input
                    type='text'
                    value={streetEnteredValue}
                    id='street'
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                />
                {(streetHasError || !formInputsValidity.street) && <p>Please enter a valid street!</p>}

            </div>
            <div className={inputPostalClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    type='text'
                    value={postalEnteredValue}
                    id='postal'
                    onChange={postalChangeHandler}
                    onBlur={postalBlurHandler}
                />
                {(postalHasError || !formInputsValidity.postalCode) && <p>Please enter a valid 5-digit postal code!</p>}

            </div>
            <div className={inputCityClasses}>
                <label htmlFor='city'>City</label>
                <input
                    type='text'
                    value={cityEnteredValue}
                    id='city'
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler} />
                {(cityHasError || !formInputsValidity.city) && <p>Please enter a valid city!</p>}

            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} > Confirm</button>
            </div>
        </form >
    );
};

export default Checkout;