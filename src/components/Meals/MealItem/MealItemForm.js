import React, { useRef, useState } from 'react'
import styles from './MealItemForm.module.css'
import Input from '../../UI/Input'

function MealItemForm(props) {
  const amountInputRef = useRef();
  const [isValidAmount , setIsValidAmount] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if(enteredAmount.trim().length ===  0 || enteredAmountNumber < 1 || enteredAmount > 5){
      setIsValidAmount(false)
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    amountInputRef.current.value = 1
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
        <Input label="Amount" 
          ref={amountInputRef}
         input={{
          id:   "amount",
          type: "number",
          min:  '1',
          max:  '5',
          step: '1',
          defaultValue: '1'
        }} />
        <button>+ Add</button>
        {!isValidAmount && <p>Please enter valid amount between (1-5)</p>}
    </form>
  )
}

export default MealItemForm