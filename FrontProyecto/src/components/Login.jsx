import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../services/AuthContext';

const message = ['Usuario logueado correctamente', 'Error, Intente de nuevo'];
const url = "https://proyecto-pds-24-ii-production.up.railway.app/token";

export default function Login() {
    const [openAlert, setOpenAlert] = useState(false);
    const [correo, setCorreo] = useState(""); 
    const [contraseña, setContraseña] = useState(""); 
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated, userId, setUserId } = useContext(AuthContext);

    const handleCloseAlert = () => {
        setOpenAlert(false);
        if (!error) {
            if (userId === 5) {
                navigate('/admin', { state: { isAuthenticated: true, isAdmin: true } });
            } else {
                setIsAuthenticated(true); // Actualiza el estado global
                //setUserId(userId); // Guarda el ID del usuario
                navigate('/', { state: { isAuthenticated: true, isAdmin: false } });
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", correo);
        formData.append("password", contraseña);

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Login fallido");
            }
            return res.json();
        })
        .then(data => {

            if (data.message === 'Usuario logueado exitosamente') {
                console.log("Usuario logueado con ID:", data.user_id);
                setUserId(data.user_id); 
                setError(false);
            } else {
                setError(true);
            }
            setOpenAlert(true);
        })
        .catch(err => {
            console.error(err);
            setError(true);
            setOpenAlert(true);
        });
    }

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    return (
        <Grid container component="main" sx={{ height: { md: '100vh', xs: '100vh' } }}>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
                <DialogTitle id="alert-dialog-title">
                {error 
                    ? message[1] 
                    : userId === 5 
                        ? "Bienvenido, Administrador. ID: 5" 
                        : `Bienvenido, Usuario. ID: ${userId}`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlert} color="primary" autoFocus>
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>

            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/112015/6970a428ea729716bb0cc2b968be11f4f0ccbc06.XL2.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            />
            <Link to={"/"}>
                <IconButton sx={{ position: 'absolute', backgroundColor: { sm: '#DDE2E5' }, color: 'gray', m: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>

            <Grid item xs={12} sm={8} md={5} component={Paper} square>
                <Box
                    sx={{
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={correo.length === 0}
                            helperText={correo.length === 0 ? "Correo no válido" : ""}
                            margin="normal"
                            required
                            fullWidth
                            id="correo"
                            label="Correo"
                            name="correo"
                            autoComplete="email"
                            autoFocus
                            value={correo}
                            onChange={(e) => handleInputChange(e, setCorreo)}
                        />
                        <TextField
                            error={contraseña.length === 0}
                            helperText={contraseña.length === 0 ? "Contraseña no válida" : ""}
                            margin="normal"
                            required
                            fullWidth
                            name="contraseña"
                            label="Contraseña"
                            type="password"
                            id="contraseña"
                            autoComplete="current-password"
                            value={contraseña}
                            onChange={(e) => handleInputChange(e, setContraseña)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
                        >
                            Iniciar sesión
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/Register">
                                    {"No tienes una cuenta? Regístrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
