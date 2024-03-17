import React from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";

function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  const dispatch = useDispatch();

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        key: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
