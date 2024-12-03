import React, { useContext, useState } from "react";
import { useCart } from "../../components/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import "./Carrito.css";

const Carrito = () => {
  const { cartItems, total, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useContext(AuthContext);

  // Nuevos estados para Delivery y Tipo de Documento
  const [delivery, setDelivery] = useState(0); // Costo de delivery (0 para recojo en tienda)
  const [tipoDocumento, setTipoDocumento] = useState("boleta"); // "boleta" o "factura"

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("Por favor, inicia sesión para continuar con el pago.");
      navigate("/login");
      return;
    }

    // Crear el JSON según el formato esperado por el backend
    const paymentData = {
      idUsuario: userId,
      productos: cartItems.map((product) => ({
        idProducto: product.idProducto,
        cantidad: product.quantity,
      })),
      delivery: parseFloat(delivery), // Asegurar que sea un número
      tipoDocumento: tipoDocumento,
    };

    console.log("Datos enviados al backend:", paymentData);

    try {
      // Llamada al backend para crear la sesión de pago
      const response = await fetch("https://proyecto-pds-24-ii-production.up.railway.app/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.url) {
        // Redirigir al cliente a Stripe
        window.location.href = data.url;
      } else {
        console.error("Error en el backend:", data.detail || "Error desconocido");
        alert("Error al iniciar el pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Hubo un problema al procesar el pago. Intenta nuevamente.");
    }
  };

  return (
    <div className="carrito-container">
      <div className="carrito-content">
        <h1 className="carrito-title">Tu Carrito</h1>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((product) => (
              <div key={product.idProducto} className="carrito-product-card">
                <div className="product-image-container">
                  <img
                    src={product.imagen}
                    alt={product.nombreProducto}
                    className="product-image"
                  />
                </div>
                <div className="product-details">
                  <h2 className="product-name">{product.nombreProducto}</h2>
                  <p className="product-price">
                    Total: S/{" "}
                    {(
                      product.quantity *
                      (product.precioUnitario +
                        product.toppings.reduce((sum, topping) => sum + topping.precioUnitario, 0) +
                        (product.bebida ? product.bebida.precioUnitario : 0))
                    ).toFixed(2)}
                  </p>
                  <div className="personalization">
                    <h4>Personalización del Producto:</h4>
                    <p>Precio base: S/ {product.precioUnitario}</p>
                    {product.toppings.map((topping, index) => (
                      <p key={index}>
                        Topping: {topping.nombreProducto} - S/ {topping.precioUnitario}
                      </p>
                    ))}
                    {product.bebida && (
                      <p>
                        Bebida: {product.bebida.nombreProducto} - S/ {product.bebida.precioUnitario}
                      </p>
                    )}
                  </div>
                  <div className="product-actions">
                    <span className="product-quantity">Cantidad: {product.quantity}</span>
                    <button
                      className="remove-product-button"
                      onClick={() => removeFromCart(product.idProducto)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="carrito-total">
              <div className="subtotal">
                <h2>SubTotal: S/ {total.toFixed(2)}</h2>
              </div>
              <div>
                <label>Delivery:</label>
                <select
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                >
                  <option value={0}>Recojo en Tienda</option>
                  <option value={5.0}>Delivery (S/ 5.00)</option>
                </select>
              </div>
              <div>
                <label>Tipo de Documento:</label>
                <select
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option value="boleta">Boleta</option>
                  <option value="factura">Factura</option>
                </select>
              </div>
              <div className="footer-buttons">
                <button className="clear-cart-button" onClick={clearCart}>
                  Vaciar Carrito
                </button>
                <button className="pay-button" onClick={handleCheckout}>
                  Ir a Pagar
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <h2 className="empty-cart-title">Comienza tu próximo pedido</h2>
            <p className="empty-cart-description">
              Agrega algún alimento favorito y aparecerán aquí. Tendrás la oportunidad de revisar antes de realizar el pago.
            </p>
            <button className="empty-cart-button" onClick={() => navigate("/carta")}>
              Haz tu pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
