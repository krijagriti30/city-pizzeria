import React from "react";
import "../styles/Menu.css";

function MenuItem({ image, name, price, onAddToCart, onBuyNow }) {
  return (
    <div className="menuItem">
      <div
        className="menuItemImage"
        style={{ backgroundImage: `url(${image})` }}
        alt={`${name}`}
      ></div>
      <h2 className="menuItemTitle">{name}</h2>
      <p className="menuItemPrice">${price.toFixed(2)}</p>
      <div className="menu-buttons">
        <button className="add-to-cart" onClick={onAddToCart}>
          Add to Cart
        </button>
        <button className="buy-now" onClick={onBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
