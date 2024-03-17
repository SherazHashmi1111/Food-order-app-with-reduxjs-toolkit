import { Fragment } from "react";
import Meals from "./components/Meals/Meals";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { useSelector } from "react-redux";

function App() {
  const cartVisibility = useSelector((state) => state.visibility.showCart);
  return (
    <Fragment>
      {cartVisibility && <Cart />}
      <Header />
      <Meals />
    </Fragment>
  );
}

export default App;
