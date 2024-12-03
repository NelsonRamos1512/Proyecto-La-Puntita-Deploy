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
import EditIcon from "@mui/icons-material/Edit"; // Icono para "Modificar Carta"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icono para "Salir"
import { useLocation, useNavigate } from "react-router-dom"; // Manejo de rutas
import MiCuentaAdmin from "./MiCuentaAdmin";
import Pedido from "./Pedido";
import ModificarCarta from "./ModificarCarta";

const NAVIGATION = [
  {
    kind: "header",
    title: "Gestión de Cuenta",
  },
  {
    segment: "/admin/mi-cuenta",
    title: "Mi Cuenta",
    icon: <DashboardIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Gestión de Pedidos y Carta",
  },
  {
    segment: "/admin/pedidos",
    title: "Pedidos",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "/admin/modificar-carta",
    title: "Modificar Carta",
    icon: <EditIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "/login",
    title: "Salir",
    icon: <ExitToAppIcon />,
    isLogout: true, // Indica que es el botón de salir
  },
];

const AppBarAdmin = () => {
  const location = useLocation(); // Obtener la ubicación actual
  const navigate = useNavigate(); // Navegar entre rutas

  // Función para manejar la navegación
  const handleNavigation = (path, isLogout) => {
    if (isLogout) {
      console.log("Cerrando sesión...");
      navigate(path); // Redirige al login
    } else {
      navigate(path); // Navega a la ruta seleccionada
    }
  };

  // Renderizar contenido según la ruta seleccionada
  const renderContent = () => {
    switch (location.pathname) {
      case "/admin/mi-cuenta":
        return <MiCuentaAdmin />;
      case "/admin/pedidos":
        return <Pedido />;
      case "/admin/modificar-carta":
        return <ModificarCarta />;
      default:
        return <Typography variant="h5">Bienvenido al Panel de Administración</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* AppBar superior */}
      <AppBar position="static" sx={{ backgroundColor: "#f58ab8" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Panel de Administración
          </Typography>

          {/* Botón Cerrar Sesión */}
          
        </Toolbar>
      </AppBar>

      {/* Layout con barra lateral y contenido principal */}
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
                  onClick={() => handleNavigation(item.segment, item.isLogout)}
                  sx={{
                    textAlign: "center",
                    backgroundColor:
                      location.pathname === item.segment ? "#ddd" : "",
                    "&:hover": { backgroundColor: "#eee" },
                  }}
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

export default AppBarAdmin;
