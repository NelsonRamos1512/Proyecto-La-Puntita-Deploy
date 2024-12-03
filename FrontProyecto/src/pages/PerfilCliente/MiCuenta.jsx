import React, { useContext, useEffect, useState } from "react";

import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import { AuthContext } from '../../services/AuthContext'; // Ruta corregida

const url = "https://proyecto-pds-24-ii-production.up.railway.app/profile";

const MiCuenta = () => {
    const { userId } = useContext(AuthContext); // Obtén el ID del usuario logueado
    const [userData, setUserData] = useState({}); // Estado para los datos del usuario
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            console.warn("No hay un userId definido");
        return;
        }
        fetch(`${url}?id_user=${userId}`)

            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del usuario");
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
        return <Typography>Cargando...</Typography>;
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
                    width: "400px",
                    backgroundColor: "#fff",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #ddd",
                }}
            >
                <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
                    <Typography variant="h5">Mi Cuenta</Typography>
                </Box>
  
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="DNI"
                            fullWidth
                            disabled
                            value={userData.dni || ""}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            fullWidth
                            disabled
                            value={userData.nombre || ""}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Apellido"
                            fullWidth
                            disabled
                            value={userData.apellido || ""}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Teléfono"
                            fullWidth
                            disabled
                            value={userData.telefono || ""}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Correo electrónico"
                            fullWidth
                            disabled
                            value={userData.email || ""}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Dirección"
                            fullWidth
                            disabled
                            value={userData.direccion || ""}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Referencia"
                            fullWidth
                            disabled
                            value={userData.referencia || ""}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                    <Button variant="contained" color="success" sx={{ textTransform: "none" }}>
                        Guardar cambios
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MiCuenta;