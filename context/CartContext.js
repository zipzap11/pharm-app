import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: {},
  setCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  return (
    <CartContext.Provider
      value={{
        cart: cart,
        setCart: setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
