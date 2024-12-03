import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  // Función para agregar al carrito
  const addToCart = (product, quantity = 1, toppings = [], bebida = null) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.idProducto === product.idProducto);
      const toppingsCost = toppings.reduce((total, t) => total + t.precioUnitario, 0);
      const bebidaCost = bebida ? bebida.precioUnitario : 0;
      const subtotal = (product.precioUnitario + toppingsCost + bebidaCost) * quantity;
  
      if (existingProduct) {
        return prev.map((item) =>
          item.idProducto === product.idProducto
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: item.subtotal + subtotal,
                toppings: [...item.toppings, ...toppings],
                bebida: bebida || item.bebida,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity,
            toppings,
            bebida,
            subtotal,
          },
        ];
      }
    });
  
    setTotal((prev) => {
      const toppingsCost = toppings.reduce((total, t) => total + t.precioUnitario, 0);
      const bebidaCost = bebida ? bebida.precioUnitario : 0;
      return prev + (product.precioUnitario + toppingsCost + bebidaCost) * quantity;
    });
  
    setCountProducts((prev) => prev + quantity);
  };
  

  // Función para eliminar del carrito
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const product = prev.find((item) => item.idProducto === productId);
      if (!product) return prev;

      const toppingsTotal = product.toppings.reduce((sum, topping) => sum + topping.precioUnitario, 0);
      const bebidaTotal = product.bebida ? product.bebida.precioUnitario : 0;

      setTotal((prevTotal) => prevTotal - product.precioUnitario * product.quantity - toppingsTotal - bebidaTotal);
      setCountProducts((prevCount) => prevCount - product.quantity);

      return prev.filter((item) => item.idProducto !== productId);
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total, countProducts }}>
      {children}
    </CartContext.Provider>
  );
};
