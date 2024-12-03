import { useState } from "react";
import "./DetallesProducto.css";
import { FaTrash } from "react-icons/fa"; // Importar ícono de basura
import { useCart } from "../../components/CartContext"; // Importar hook de contexto de carrito


export default function DetallesProducto({ producto, productos, onClose }) {
    // Filtrar toppings y bebidas de la base de datos
    const { addToCart } = useCart();
    const toppings = productos.filter(item => item.idTipoProducto === 3 || item.idTipoProducto === 4);
    const bebidas = productos.filter(item => item.idTipoProducto === 2);

    const [selectedToppings, setSelectedToppings] = useState([]);
    const [selectedBebida, setSelectedBebida] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    const handleAddToCart = () => {
        addToCart(producto, cantidad, selectedToppings, selectedBebida);
        onClose();
      };         

    // Manejar selección de toppings
    const handleToggleTopping = (topping) => {
        setSelectedToppings((prev) => {
            if (prev.includes(topping)) {
                return prev.filter((item) => item !== topping);
            } else if (prev.length < 3) {
                return [...prev, topping];
            } else {
                alert("Máximo de 3 toppings permitido.");
                return prev;
            }
        });
    };

    // Manejar selección de bebida
    const handleSelectBebida = (bebida) => {
        setSelectedBebida(bebida);
    };

    // Manejar cambio de cantidad
    const handleIncrement = () => setCantidad(cantidad + 1);
    const handleDecrement = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    };

    {/* // Agregar al carrito
    const handleAddToCart = () => {
        alert(`Producto añadido al carrito con ${cantidad} unidades.`);
        onClose();
    };*/}
    

    // Renderizar opciones de selección con estilo similar a la imagen proporcionada
    const renderOptions = () => {
        if (["Latino", "Suggar daddy", "Europeo", "Africano", "Dinamita", "Cocolover", "Europea", "Pichanguera", "Power", "Malcriada"].includes(producto.nombreProducto)) {
            // Opciones para Waffles (Puntitas y Cuquitas)
            return (
                <>
                    <div className="opciones-container">
                        <h3>Selecciona tus toppings (Máximo 3)</h3>
                        {toppings.map((topping) => (
                            <div key={topping.idProducto} className="opcion-item">
                                <img src={topping.imagen || "https://via.placeholder.com/150"} alt={topping.nombreProducto} className="opcion-imagen" />
                                <span className="opcion-nombre">{topping.nombreProducto} - S/ {topping.precioUnitario}</span>
                                <input
                                    type="checkbox"
                                    onChange={() => handleToggleTopping(topping)}
                                    checked={selectedToppings.includes(topping)}
                                    className="opcion-checkbox"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="opciones-container">
                        <h3>Selecciona tu bebida (Opcional)</h3>
                        {bebidas.map((bebida) => (
                            <div key={bebida.idProducto} className="opcion-item">
                                <img src={bebida.imagen || "https://via.placeholder.com/150"} alt={bebida.nombreProducto} className="opcion-imagen" />
                                <span className="opcion-nombre">{bebida.nombreProducto} - S/ {bebida.precioUnitario}</span>
                                <input
                                    type="radio"
                                    name="bebida"
                                    onChange={() => handleSelectBebida(bebida)}
                                    checked={selectedBebida === bebida}
                                    className="opcion-radio"
                                />
                            </div>
                        ))}
                    </div>
                </>
            );
        } else if (["Moreno", "Gringo", "Vergano", "Juguetón", "Carnoso"].includes(producto.nombreProducto)) {
            // Opciones para Maxipizzas
            return (
                <div className="opciones-container">
                    <h3>Selecciona tu bebida (Opcional)</h3>
                    {bebidas.map((bebida) => (
                        <div key={bebida.idProducto} className="opcion-item">
                            <img src={bebida.imagen || "https://via.placeholder.com/150"} alt={bebida.nombreProducto} className="opcion-imagen" />
                            <span className="opcion-nombre">{bebida.nombreProducto} - S/ {bebida.precioUnitario}</span>
                            <input
                                type="radio"
                                name="bebida"
                                onChange={() => handleSelectBebida(bebida)}
                                checked={selectedBebida === bebida}
                                className="opcion-radio"
                            />
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="detalles-container">
            <button className="close-button" onClick={onClose}>X</button>
            <div className="producto-imagen-container">
            <img src={producto.imagen || "https://via.placeholder.com/150"} alt={producto.nombreProducto} className="producto-imagen" />
            </div>
            <div className="producto-detalles">
                <h2>{producto.nombreProducto}</h2>
                <p>{producto.descripcion}</p>
                <p className="producto-precio">S/ {producto.precioUnitario}</p>
            </div>

            {/* Opciones de selección */}
            {renderOptions()}

            {/* Control de cantidad con ícono de basura */}
            <div className="cantidad-container">
                <button className="cantidad-boton basura" onClick={onClose}>
                    <FaTrash />
                </button>
                <button className="cantidad-boton" onClick={handleDecrement}>-</button>
                <span className="cantidad">{cantidad}</span>
                <button className="cantidad-boton" onClick={handleIncrement}>+</button>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
                Agregar al pedido
            </button>
        </div>
    );
}
