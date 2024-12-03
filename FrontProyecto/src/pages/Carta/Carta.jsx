import { useEffect, useState } from "react";
import "./Carta.css";
import DetallesProducto from "./DetallesProducto";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/productos";

const categorias = {
    Puntitas: ["Latino", "Suggar daddy", "Europeo", "Africano","Dinamita"],
    Cuquitas: ["Cocolover", "Europea", "Pichanguera", "Power", "Malcriada"],
    Maxipizzas: ["Moreno", "Gringo", "Vergano", "Juguetón", "Carnoso"]
};


export default function Carta() {
    const [productos, setProductos] = useState([]);
    const [mainProducts, setMainProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMainProducts(data.filter((item) => item.idTipoProducto === 1));
                setProductos(data);
            } catch (error) {
                console.error("Error fetching productos:", error);
            }
        };

        fetchProductos();
    }, []);

    // Filtrar productos según la categoría seleccionada
    const filteredProducts = mainProducts.filter((product) => {
        if (selectedCategory === "Todos") return true;
        return categorias[selectedCategory]?.includes(product.nombreProducto);
    });

    return (
        <div className="carta-container">
            <h1>Carta</h1>

            {/* Barra de categorías */}
            <div className="categoria-barra">
                {["Todos", "Puntitas", "Cuquitas", "Maxipizzas"].map((categoria) => (
                    <button
                        key={categoria}
                        className={`categoria-boton ${selectedCategory === categoria ? "active" : ""}`}
                        onClick={() => setSelectedCategory(categoria)}
                    >
                        {categoria.toUpperCase()}
                    </button>
                ))}
            </div>

            <section className="categoria">
                <div className="producto-lista">
                    {filteredProducts.map((product) => (
                        <div key={product.idProducto} className="producto-tarjeta">
                            <img src={product.imagen} alt={product.nombreProducto} className="producto-imagen" />
                            <div className="producto-info">
                                <h3 className="producto-nombre">{product.nombreProducto}</h3>
                                <p className="producto-descripcion">{product.descripcion || "Sin descripción"}</p>
                                <p className="producto-precio">S/ {product.precioUnitario}</p>
                                <button className="boton-agregar" onClick={() => setSelectedProduct(product)}>Agregar al pedido</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {selectedProduct && (
                <DetallesProducto
                    producto={selectedProduct}
                    productos={productos}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
