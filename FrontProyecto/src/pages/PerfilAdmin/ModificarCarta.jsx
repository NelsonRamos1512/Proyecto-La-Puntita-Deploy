import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ModificarCarta = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Mostrar 8 productos por página
  const [formData, setFormData] = useState({
    idProducto: "",
    nombreProducto: "",
    descripcion: "",
    precioUnitario: "",
    imagen: "",
    idTipoProducto: "",
  });
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);

  const fetchProductos = async () => {
    try {
      const response = await fetch("https://proyecto-pds-24-ii-production.up.railway.app/productos");
      const data = await response.json();
      setProductos(data || []);
      setFilteredProductos(data || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Si el texto es null o undefined, retorna un string vacío
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const categoriaTexto = (idTipoProducto) => {
    if (idTipoProducto === 1) return "Waffles";
    if (idTipoProducto === 2) return "Bebidas";
    if (idTipoProducto === 3) return "Toppings";
    return "Desconocido";
  };

  const handleOpenAgregar = () => {
    setFormData({
      idProducto: "",
      nombreProducto: "",
      descripcion: "",
      precioUnitario: "",
      imagen: "",
      idTipoProducto: "",
    });
    setOpenAgregar(true);
  };

  const handleOpenEditar = (producto) => {
    setFormData(producto);
    setOpenEditar(true);
  };

  const handleCloseModal = () => {
    setOpenAgregar(false);
    setOpenEditar(false);
  };

  const handleSave = () => {
    console.log("Producto guardado:", formData);
    setOpenAgregar(false);
    setOpenEditar(false);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(filteredProductos.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = filteredProductos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#f58ab8", fontWeight: "bold" }}>
        Modificar Carta
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#f58ab8",
          "&:hover": { backgroundColor: "#f78bb9" },
          marginBottom: "16px",
        }}
        onClick={handleOpenAgregar}
      >
        + Agregar
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="center">Categoría</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Descripción</TableCell>
            <TableCell align="center">Precio U.</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((producto) => (
            <TableRow key={producto.idProducto}>
              <TableCell align="center">{producto.idProducto}</TableCell>
              <TableCell align="center">
                <img
                  src={producto.imagen || "default-image.jpg"}
                  alt="Producto"
                  style={{ width: "50px", height: "50px" }}
                />
              </TableCell>
              <TableCell align="center">{categoriaTexto(producto.idTipoProducto)}</TableCell>
              <TableCell align="center">{producto.nombreProducto || "Sin Nombre"}</TableCell>
              <TableCell align="center">{truncateText(producto.descripcion, 30)}</TableCell>
              <TableCell align="center">{`S/. ${producto.precioUnitario}`}</TableCell>
              <TableCell align="center">
                <EditIcon
                  sx={{ cursor: "pointer", color: "blue", marginRight: "8px" }}
                  onClick={() => handleOpenEditar(producto)}
                />
                <DeleteIcon sx={{ cursor: "pointer", color: "red" }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Navegación de páginas */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
        <Button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          sx={{ marginRight: "8px" }}
        >
          Anterior
        </Button>
        <Button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === Math.ceil(filteredProductos.length / itemsPerPage)}
        >
          Siguiente
        </Button>
      </Box>

      {/* Modal de agregar y editar */}
      <Dialog open={openAgregar || openEditar} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: "#f58ab8", color: "#fff" }}>
          {openAgregar ? "Agregar Producto" : "Editar Producto"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Id"
            fullWidth
            margin="normal"
            value={formData.idProducto}
            onChange={(e) => setFormData({ ...formData, idProducto: e.target.value })}
            disabled={openEditar}
          />
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={formData.nombreProducto}
            onChange={(e) => setFormData({ ...formData, nombreProducto: e.target.value })}
          />
          <Select
            fullWidth
            value={formData.idTipoProducto}
            onChange={(e) => setFormData({ ...formData, idTipoProducto: e.target.value })}
            displayEmpty
          >
            <MenuItem value="">Categoría</MenuItem>
            <MenuItem value={1}>Waffles</MenuItem>
            <MenuItem value={2}>Bebidas</MenuItem>
            <MenuItem value={3}>Toppings</MenuItem>
          </Select>
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
          <TextField
            label="Precio Unitario"
            fullWidth
            margin="normal"
            value={formData.precioUnitario}
            onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })}
          />
          <TextField
            label="Url de la imagen"
            fullWidth
            margin="normal"
            value={formData.imagen}
            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f58ab8", "&:hover": { backgroundColor: "#f78bb9" } }}
            onClick={handleSave}
          >
            {openAgregar ? "Guardar Producto" : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModificarCarta;

/*const ModificarCarta = () => {
    return <h2>ModificarCartaa</h2>;
  };
  
  export default ModificarCarta;*/