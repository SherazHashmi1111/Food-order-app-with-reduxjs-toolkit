import React, { Fragment } from 'react'
import MealsImg from '../../assets/meals.jpg'
import  styles from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

function Header(props) {
  return (<Fragment>
    <header className={styles.header}>
        <h1>Redux Food Panda</h1>
        <HeaderCartButton onClick = {props.onClick}>Cart</HeaderCartButton>
    </header>
    <div className={styles.main_image}>
        <img src={MealsImg} alt="A table ful of foods" />
    </div>
  </Fragment>
  )
}

export default Header