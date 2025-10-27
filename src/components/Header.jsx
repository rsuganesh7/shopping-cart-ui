import { useContext, useMemo, useState } from 'react';
import { CartContext } from '../context/context';
import './Header.css';

const noop = () => {};

const Header = ({ resolveProductImage }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const contextValue = useContext(CartContext) ?? {};
  const {
    cartItems = [],
    removeFromCart = noop,
  } = contextValue;

  const { itemCount,  formattedTotal } = useMemo(() => {
    const count = cartItems.reduce(
      (acc, item) => acc + (item.qty ?? item.quantity ?? 0),
      0
    );


    const total = cartItems.reduce((acc, item) => {
      const qty = item.qty ?? item.quantity ?? 0;
      const price = Number.isFinite(item.price) ? item.price : 0;
      return acc + qty * price;
    }, 0);

    return {
      itemCount: count,
      formattedTotal: total.toFixed(2),
    };
  }, [cartItems]);

  const resolveImage =
    typeof resolveProductImage === 'function'
      ? resolveProductImage
      : (path) => path;

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
      <button
        type="button"
        className="app-header__menu-button"
        aria-haspopup="true"
        aria-expanded={showDropDown}
        onClick={() => setShowDropDown((prev) => !prev)}
      >
        <span className="app-header__menu-label">Summary</span>
        <span className="app-header__menu-meta">${formattedTotal}</span>
        <i
          className={`bx ${showDropDown ? 'bx-chevron-up' : 'bx-chevron-down'}`}
          aria-hidden="true"
        />
      </button>
      {showDropDown && (
        <div className="app-header__dropdown" role="dialog">
          <div className="app-header__dropdown-content">
            <div className="app-header__dropdown-item">
              <span className="app-header__dropdown-item-label">
                Items in cart
              </span>
              <span className="app-header__dropdown-item-value">{itemCount}</span>
            </div>
            <div className="app-header__dropdown-divider" />
            {cartItems.length === 0 ? (
              <div className="app-header__empty">Your cart is empty</div>
            ) : (
              <ul className="app-header__list">
                {cartItems.map((item) => {
                  const qty = item.qty ?? item.quantity ?? 0;
                  const price = Number.isFinite(item.price) ? item.price : 0;

                  return (
                    <li key={item.id} className="app-header__list-item">
                      {item.image && (
                        <img
                          src={resolveImage(item.image)}
                          alt={item.name}
                          className="app-header__list-image"
                        />
                      )}
                      <div className="app-header__list-details">
                        <span className="app-header__list-name">{item.name}</span>
                        <span className="app-header__list-meta">
                          Qty: {qty}
                        </span>
                      </div>
                      <span className="app-header__list-price">
                        ${(qty * price).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        className="app-header__list-remove"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeFromCart(item)}
                      >
                        <i className="bx bx-trash" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="app-header__dropdown-divider" />
            <div className="app-header__dropdown-item app-header__dropdown-item--total">
              <span className="app-header__dropdown-item-label">Order total</span>
              <span className="app-header__dropdown-item-value">
                ${formattedTotal}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
