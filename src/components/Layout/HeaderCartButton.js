import React, { useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { visibilityActions } from "../../store";

function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const dispatch = useDispatch();
  const showCartHandler = (e) => {
    e.preventDefault();
    dispatch(visibilityActions.showCart());
  };
  // const ctx = useContext(CartContext);
  const cart = useSelector((state) => state.cart);
  const numberOfCartItems = cart.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);
  const { items } = cart;
  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    return () => {
      setBtnIsHighlighted(true);
      const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={showCartHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
