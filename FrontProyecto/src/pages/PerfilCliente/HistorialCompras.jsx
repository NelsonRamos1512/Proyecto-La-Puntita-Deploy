import React, { useContext, useEffect, useState } from "react";

import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from '../../services/AuthContext'; // Ruta corregida
const url = "https://proyecto-pds-24-ii-production.up.railway.app/historial";

const HistorialCompras = () => {
  const { userId } = useContext(AuthContext); // Obtén el ID del usuario logueado
  const [userData, setUserData] = useState([]); // Estado para los datos del usuario
  const [loading, setLoading] = useState(true);
 
  useEffect(()=> {
    if(!userId){
      console.warn("no hay userId definido");
      return;
    }

    console.log(`${url}?iduser=${userId}`);
    fetch(`${url}?iduser=${userId}`)

              .then((response) => {
                  if (!response.ok) {
                      throw new Error("Error al obtener los compras del usuario");
                  }
                  return response.json();
              })
              .then((data) => {
                  setUserData(data); // Guarda los datos obtenidos
                  setLoading(false);
              })
              .catch((error) => {
                  console.error(error);
                  setLoading(false);
              });
  }, [userId]);
  
  if (loading) {
    return <Typography>Cargando historial de compras...</Typography>;
  }
  
  if (!userData.length) {
    return <Typography>No se encontraron compras.</Typography>;
  }
  



  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          width: "1200px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        {/* Barra de búsqueda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            backgroundColor: "#f4f4f4",
            borderRadius: "20px",
            padding: "4px 16px",
            border: "1px solid #ddd",
          }}
        >
          <SearchIcon sx={{ marginRight: "8px", color: "#999" }} />
          <TextField
            placeholder="Nombre o código"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            fullWidth
          />
        </Box>

        {/* Tabla */}
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                <TableCell sx={{ fontWeight: "bold" }}>IdFacturacion</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>NombreDocumento</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>CodigoBoleta</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>ImporteVenta</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>ImporteDelibery</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Igv</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>ImporteTotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((row) => (
                 <TableRow key={row.idFacturacion}>
                  <TableCell>{row.idFacturacion}</TableCell>
                  <TableCell>{row.tipoDocumento}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{row.codigoBoleta}</TableCell>
                  <TableCell>{row.importeVenta}</TableCell>
                  <TableCell>{row.importeDelivery}</TableCell>
                  <TableCell>{row.importeIGV}</TableCell>
                  <TableCell>{row.importeTotal}</TableCell>
              </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HistorialCompras;