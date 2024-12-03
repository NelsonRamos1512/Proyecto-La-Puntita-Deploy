import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Appbar';
import AppBarCliente from './pages/PerfilCliente/appBarCliente';
import Inicio from './pages/Home/Home';
import Login from './components/Login';
import Carta from './pages/Carta/Carta';
import Contacto from './pages/Contacto/Contacto';
import Register from './components/Register';
import { AuthProvider } from './services/AuthContext';
import Carrito from './pages/Carrito/Carrito';
import MiCuenta from './pages/PerfilCliente/MiCuenta';
import Seguridad from './pages/PerfilCliente/Seguridad';
import HistorialCompras from './pages/PerfilCliente/HistorialCompras';
import SeguimientoPedido from './pages/PerfilCliente/SeguimientoPedido';
import MiCuentaAdmin from './pages/PerfilAdmin/MiCuentaAdmin'; // Cambiado a PerfilAdmin
import Pedido from './pages/PerfilAdmin/Pedido'; // Agregado
import ModificarCarta from './pages/PerfilAdmin/ModificarCarta';
import AppBarAdmin from './pages/PerfilAdmin/AppBarAdmin';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*<Route path="/validate" element={<Validate />} />*/}
            <Route
              path="/*"
              element={
                <>
                  <ResponsiveAppBar />
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/carta" element={<Carta />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/ventas" element={<h1>Ventas</h1>} />
                    {/* Rutas para Delivery y Recojo en tienda */}
                    <Route path="/delivery" element={<h1>Delivery</h1>} />
                    <Route path="/pickup" element={<h1>Login</h1>} />
                    <Route path="/carrito" element={<Carrito />} /> {/* Nueva ruta */}
                  
                  </Routes>
                </>
              }
            />

            {/* Rutas para Perfil del Cliente */}
            <Route
              path="/perfil/*"
              element={
                <>
                <AppBarCliente/>
                  <Routes>
                    <Route path="/perfil/mi-cuenta" element={<MiCuenta />} />
                    <Route path="/perfil/seguridad" element={<Seguridad />} />
                    <Route path="/perfil/historial-compras" element={<HistorialCompras />} />
                    <Route path="/perfil/seguimiento-pedidos" element={<SeguimientoPedido />} />
                  </Routes>
                
                </>
              }
            />

            <Route
              path="/admin/*"
              element={
                <>
                  <AppBarAdmin />
                  <Routes>
                    <Route path="/admin/mi-cuenta" element={<MiCuentaAdmin />} />
                    <Route path="/admin/pedidos" element={<Pedido />} />
                    <Route path="/admin/modificar-carta" element={<ModificarCarta />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
