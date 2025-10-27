import { useState } from 'react';
import { CartContext } from '../context/context';
import './Header.css';

const Header = ({resolveProductImage}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartItems = [] } = value ?? {};
        const itemCount = cartItems.reduce(
          (acc, item) => acc + (item.qty ?? item.quantity ?? 0),
          0
        );
        const totalPrice = cartItems.reduce(
          (acc, item) => acc + (item.qty ?? item.quantity ?? 0) * item.price,
          0
        );

        return (
          <header className="app-header">
            <div className="app-header__title">
              <span
                className="app-header__icon"
              >
                <i className="bx bx-cart" aria-hidden="true" />
              </span>
              <div>
                <h1 className="app-header__heading">Shopping Cart</h1>
                <p className="app-header__subtitle">
                  Curate tech you will reach for every day
                </p>
              </div>
            </div>
            <button onClick={() => setShowDropDown(!showDropDown)}>
              <i className="bx bx-menu" />
            </button>
            {showDropDown && (
              <div className="app-header__dropdown">
                <div className="app-header__dropdown-content">
                  <span>Items in cart: {itemCount}</span>
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <img
                        src={resolveProductImage(item.image)}
                        alt={item.name}
                        className="app-header__dropdown-image"
                      />
                      <span>{item.name}</span>
                      <span>{item.qty}</span>
                    </div>
                  ))}
                  <span>Total: ${totalPrice}</span>                   
                </div>
              </div>
            )}
          </header>
        );
      }}
    </CartContext.Consumer>
  );
};

export default Header;
