import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import SecurityIcon from "@mui/icons-material/Security"; // Nuevo icono para Seguridad
import { useLocation, useNavigate } from "react-router-dom"; // Importar useNavigate
import { useContext } from "react"; // Importar el contexto
import { AuthContext } from "../../services/AuthContext"; // Importar AuthContext
import MiCuenta from "./MiCuenta";
import Seguridad from "./Seguridad";
import HistorialCompras from "./HistorialCompras";
import SeguimientoPedido from "./SeguimientoPedido"

const NAVIGATION = [
  {
    kind: "header",
    title: "Configuración de Cuenta",
  },
  {
    segment: "/perfil/mi-cuenta", // Rutas corregidas con el prefijo '/perfil'
    title: "Mi Perfil",
    icon: <DashboardIcon />,
  },
  {
    segment: "/perfil/historial-compras", // Rutas corregidas con el prefijo '/perfil'
    title: "Historial de Compras",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "/perfil/seguridad", // Nueva ruta de Seguridad
    title: "Seguridad",
    icon: <SecurityIcon />, // Usar el icono de Seguridad
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Otras Opciones",
  },
  {
    segment: "/perfil/seguimiento-pedidos", // Rutas corregidas con el prefijo '/perfil'
    title: "Seguimiento de Pedidos",
    icon: <BarChartIcon />,
  },
];

const AppBarCliente = () => {
  const location = useLocation(); // Obtener la ubicación actual
  const navigate = useNavigate(); // Usar navegación de react-router-dom
  const { logout } = useContext(AuthContext); // Obtener logout del contexto de autenticación

  // Función para renderizar el contenido según la ubicación
  const renderContent = () => {
    switch (location.pathname) {
      case "/perfil/mi-cuenta":
        return <MiCuenta />;
      case "/perfil/historial-compras":
        return <HistorialCompras />;
        
      case "/perfil/seguimiento-pedidos":
        return <SeguimientoPedido/>;
        
      case "/perfil/seguridad": // Nueva sección de Seguridad
      return <Seguridad/>;
        
      default:
        return <Typography variant="h5">Bienvenido a Mi Cuenta</Typography>;
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Cerrar la sesión
    navigate("/"); // Navegar a la página principal
  };

  // Función para regresar al menú principal
  const handleBack = () => {
    navigate("/"); // Ir al menú principal
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* AppBar superior */}
      <AppBar position="static" sx={{ backgroundColor: "#f58ab8" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Perfil de Usuario
          </Typography>

          {/* Botón Regresar */}
          <Button color="inherit" onClick={handleBack}>
            Regresar
          </Button>

          {/* Botón Cerrar Sesión */}
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenido del layout */}
      <Box sx={{ display: "flex", height: "100%" }}>
        {/* Navegación lateral */}
        <Box
          sx={{
            width: "240px",
            backgroundColor: "#f4f4f4",
            padding: "16px",
            borderRight: "1px solid #ddd",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Navegación
          </Typography>
          <List>
            {NAVIGATION.map((item, index) => {
              if (item.kind === "divider") {
                return <Divider key={index} sx={{ marginY: 1 }} />;
              }

              if (item.kind === "header") {
                return (
                  <Typography
                    key={index}
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ marginY: 1 }}
                  >
                    {item.title}
                  </Typography>
                );
              }

              return (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigate(item.segment)} // Usar navigate en lugar de window.location.href
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Contenido principal */}
        <Box
          sx={{
            flexGrow: 1,
            padding: "24px",
            backgroundColor: "#fff",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default AppBarCliente;



