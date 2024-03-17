import React, { useRef } from "react";
import styles from "./Checkout.module.css";
import { useDispatch } from "react-redux";
import { visibilityActions } from "../../store";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

function Checkout(props) {
  const dispatch = useDispatch();
  const hideCartHandler = (e) => {
    e.preventDefault();
    dispatch(visibilityActions.hideCart());
  };
  const nameInputRef = useRef("");
  const streetInputRef = useRef("");
  const postalCodeInputRef = useRef("");
  const cityInputRef = useRef("");
  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalcode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalcodeIsValid = isFiveChar(enteredPostalcode);

    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPostalcodeIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalcode,
      city: enteredCity,
    });
    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalCodeInputRef.current.value = "";
    cityInputRef.current.value = "";
  };
  return (
    <form onSubmit={confirmHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="postal_code">Postal code</label>
        <input type="text" id="postal_code" ref={postalCodeInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Confirm
        </button>
        <button type="button" onClick={hideCartHandler}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Checkout;
