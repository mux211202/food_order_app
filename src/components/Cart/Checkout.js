import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim().length === 0;
const postalCodeValidation = value => value.trim().length > 4 && value.slice(0,3) === 'LV-';
export default function Checkout(props) {
    const [formInputsVal, setFormInputsVal] = useState({
        name: true, 
        street: true, 
        city: true, 
        postal: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const cityIsValid = !isEmpty(enteredCity);
        const postalIsValid = postalCodeValidation(enteredPostal);

        setFormInputsVal({
            name: nameIsValid, 
            street: streetIsValid, 
            city: cityIsValid, 
            postal: postalIsValid
        });
        
        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

        if(!formIsValid) {
            return;
        }
        const userData = {enteredName, enteredStreet, enteredPostal, enteredCity}
        props.onConfirm(userData);
    }
    const nameClasses = `${classes.control} ${formInputsVal.name ? '' : classes.invalid}`;
    const streetClasses = `${classes.control} ${formInputsVal.street ? '' : classes.invalid}`;
    const postalClasses = `${classes.control} ${formInputsVal.postal ? '' : classes.invalid}`;
    const cityClasses = `${classes.control} ${formInputsVal.city ? '' : classes.invalid}`;
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name'/>
                {!formInputsVal.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Your Street</label>
                <input  ref={streetInputRef} type='text' id='street'/>
                {!formInputsVal.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} type='text' id='postal'/>
                {!formInputsVal.postal && <p>Please enter a valid postal code (LV-...)!</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='city' id='city'/>
                {!formInputsVal.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}
