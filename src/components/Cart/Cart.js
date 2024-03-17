import React, { Fragment, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, visibilityActions } from "../../store";

function Cart(props) {
  const dispatch = useDispatch();
  const hideCartHandler = (e) => {
    e.preventDefault();
    dispatch(visibilityActions.hideCart());
  };
  const ctx = useSelector((state) => state.cart);
  const [checkout, setCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = ctx.totalAmount.toFixed(2);
  const hasItems = ctx.items.length > 0;

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem(item))
  };
  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id))
  };

  const checkoutHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmit(true);
    fetch(
      "https://foodorderapp-abb98-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          orderItems: ctx.items,
          user: userData,
        }),
      }
    );
    setIsSubmit(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={hideCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <Fragment>
      <ul className={styles["cart-items"]}>
        {ctx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount </span>
        <span>{+totalAmount}</span>
      </div>
      {checkout && <Checkout onConfirm={submitOrderHandler} />}
      {!checkout && modalActions}
    </Fragment>
  );

  const isSubmittingContent = <p>Sending order data...</p>;
  const didSubmittingContent = (
    <Fragment>
      <p>Succesfully order has placed.</p>
      <button className={styles["button--alt"]} onClick={hideCartHandler}>
        Close
      </button>
    </Fragment>
  );
  return (
    <Modal>
      {!isSubmit && !didSubmit && cartModalContent}
      {isSubmit && isSubmittingContent}
      {didSubmit && didSubmittingContent}
    </Modal>
  );
}

export default Cart;
