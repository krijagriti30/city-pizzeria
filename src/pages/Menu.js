import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { MenuList } from "../helpers/MenuList";
import MenuItem from "../components/MenuItem";
import { CartContext } from "../helpers/CartContext"; // ✅ Import CartContext
import "../styles/Menu.css";

function Menu() {
  const { addToCart } = useContext(CartContext); // ✅ Access addToCart from context
  const history = useHistory(); // ✅ To navigate to cart

  const handleAddToCart = (item) => {
    addToCart(item);
    history.push("/cart"); // ✅ Navigate to cart
  };

  const handleBuyNow = (item) => {
    addToCart(item);
    history.push("/cart"); // ✅ Same as above, or redirect to checkout if needed
  };

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {MenuList.map((menuItem, key) => (
          <MenuItem
            key={key}
            image={menuItem.image}
            name={menuItem.name}
            price={menuItem.price}
            onAddToCart={() => handleAddToCart(menuItem)}
            onBuyNow={() => handleBuyNow(menuItem)}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
