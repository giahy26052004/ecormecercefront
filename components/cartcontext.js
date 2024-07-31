import { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});
export default function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    } 
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function addProduct(productId) {
    setCartProducts((pre) => {
      if (Array.isArray(pre)) {
        return [...pre, productId];
      } else {
        return [productId];
      }
    });
  }
  function removeProduct(productId) {
    setCartProducts((pre) => {
      const pos = pre.indexOf(productId);
      if (pos !== -1) {
        return pre.filter((value, index) => index !== pos);
      }
      return pre;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        clearCart,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
