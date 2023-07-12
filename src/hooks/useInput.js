import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [enteredValueTouched, setEnteredValueTouched] = useState(false);

    const enteredValueIsValid = validateValue(enteredValue);
    const hasError = !enteredValueIsValid && enteredValueTouched;

    const valueInputChangeHandler = (e) => {
        setEnteredValue(e.target.value)
        setEnteredValueTouched(true)
    };

    const valueInputBlurHandler = (e) => {
        setEnteredValueTouched(true);
    };

    const resetInput = () => {
        setEnteredValue('');
        setEnteredValueTouched(false)
    };

    return {
        value: enteredValue,
        isValid: enteredValueIsValid,
        hasError,
        valueInputBlurHandler,
        valueInputChangeHandler,
        resetInput,
    };

};

export default useInput;