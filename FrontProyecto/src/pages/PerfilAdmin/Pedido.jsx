import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Pedido = () => {
  const [facturaciones, setFacturaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filterEstado, setFilterEstado] = useState("");

  const fetchFacturaciones = async () => {
    const urlFacturaciones = "https://proyecto-pds-24-ii-production.up.railway.app/facturaciones";
    try {
      const response = await fetch(urlFacturaciones);
      const data = await response.json();
      setFacturaciones(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error al traer facturaciones:", error);
    }
  };

  const fetchUsuarios = async () => {
    const urlUsuarios = "https://proyecto-pds-24-ii-production.up.railway.app/usuarios";
    try {
      const response = await fetch(urlUsuarios);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al traer usuarios:", error);
    }
  };

  const handleSearch = (e) => {
    const id = e.target.value;
    setSearchId(id);

    const filtered = facturaciones.filter((fact) =>
      fact.idFacturacion.toString().includes(id)
    );
    setFilteredData(filtered);
  };

  const handleFilterEstado = (e) => {
    const estado = e.target.value;
    setFilterEstado(estado);

    const filtered = facturaciones.filter(
      (fact) => fact.estadoPago.toLowerCase() === estado.toLowerCase()
    );
    setFilteredData(filtered);
  };

  const handleFilterCombination = () => {
    let filtered = facturaciones;

    if (searchId) {
      filtered = filtered.filter((fact) =>
        fact.idFacturacion.toString().includes(searchId)
      );
    }

    if (filterEstado) {
      filtered = filtered.filter(
        (fact) => fact.estadoPago.toLowerCase() === filterEstado.toLowerCase()
      );
    }

    setFilteredData(filtered);
  };

  const getNombreUsuario = (idUsuario) => {
    const usuario = usuarios.find((user) => user.idUsuario === idUsuario);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido";
  };

  useEffect(() => {
    fetchFacturaciones();
    fetchUsuarios();
  }, []);

  useEffect(() => {
    handleFilterCombination();
  }, [searchId, filterEstado]);

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#f58ab8", fontWeight: "bold" }}>
        Gestión de Pedidos
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        {/* Búsqueda por ID */}
        <TextField
          label="Ingrese ID"
          variant="outlined"
          value={searchId}
          onChange={handleSearch}
          sx={{ width: "45%" }}
        />

        {/* Filtro por estado */}
        <FormControl sx={{ width: "45%" }}>
          <InputLabel>Estado</InputLabel>
          <Select value={filterEstado} onChange={handleFilterEstado} label="Estado">
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="pagado">Pagado</MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabla de pedidos */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Delivery</TableCell>
            <TableCell align="center">Importe Total</TableCell>
            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((facturacion) => {
            const usuario = usuarios.find((u) => u.idUsuario === facturacion.idUsuario);

            return (
              <TableRow key={facturacion.idFacturacion}>
                <TableCell align="center">{facturacion.idFacturacion}</TableCell>
                <TableCell align="center">{facturacion.fecha}</TableCell>
                <TableCell align="center">{usuario?.nombre || "Desconocido"}</TableCell>
                <TableCell align="center">{usuario?.apellido || "Desconocido"}</TableCell>
                <TableCell align="center">{facturacion.importeDelivery === 0 ? "No" : "Sí"}</TableCell>
                <TableCell align="center">{`S/. ${facturacion.importeTotal}`}</TableCell>
                <TableCell align="center">
                  {facturacion.estadoPago === "pagado" ? (
                    <Box
                      sx={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        backgroundColor: "white",
                        border: "2px solid green",
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Pagado
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        backgroundColor: "white",
                        border: "2px solid orange",
                        color: "orange",
                        fontWeight: "bold",
                      }}
                    >
                      Pendiente
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Pedido;

/*const Pedido = () => {
    return <h2>Pedido</h2>;
  };
  
  export default Pedido;*/