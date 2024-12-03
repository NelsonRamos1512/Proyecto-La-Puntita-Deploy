import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Divider } from "@mui/material";

// URLs de las APIs
const fetchUrl = "https://proyecto-pds-24-ii-production.up.railway.app/profile";
const updateUrl = "https://proyecto-pds-24-ii-production.up.railway.app/mi-cuenta";

const MiCuentaAdmin = () => {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    referencia: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ID del administrador
  const adminId = 5; // Puedes reemplazarlo con un valor dinámico si es necesario

  // Obtener datos del administrador al cargar el componente
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${fetchUrl}?id_user=${adminId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del administrador");
        }
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Guardar cambios en la base de datos
  const handleSave = async () => {
    try {
      const response = await fetch(`${updateUrl}?id_user=${adminId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos del administrador");
      }

      const result = await response.json();
      alert(result.message || "Cambios guardados exitosamente");
    } catch (err) {
      alert("Hubo un problema al guardar los cambios: " + err.message);
    }
  };

  if (loading) {
    return <Typography>Cargando datos...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#f58ab8", fontWeight: "bold" }}>
        Datos Personales
      </Typography>
      <Divider sx={{ marginBottom: "24px" }} />

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "24px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* DNI */}
        <TextField
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          fullWidth
          disabled
        />

        {/* Nombre */}
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
        />

        {/* Apellido */}
        <TextField
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
        />

        {/* Teléfono */}
        <TextField
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          fullWidth
        />

        {/* Correo Electrónico */}
        <TextField
          label="Correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />

        {/* Dirección */}
        <TextField
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          fullWidth
        />

        {/* Referencia */}
        <TextField
          label="Referencia"
          name="referencia"
          value={formData.referencia}
          onChange={handleChange}
          fullWidth
        />

        {/* Botón de guardar cambios */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#f58ab8",
            "&:hover": { backgroundColor: "#f78bb9" },
          }}
          onClick={handleSave}
        >
          Guardar cambios
        </Button>
      </Box>
    </Box>
  );
};

export default MiCuentaAdmin;
