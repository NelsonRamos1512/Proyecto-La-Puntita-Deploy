import React from "react";
import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { CheckCircle, ShoppingBag, LocalShipping, AssignmentTurnedIn } from "@mui/icons-material";

// Paso actual del seguimiento
const activeStep = 2; // Puedes cambiar este valor para probar diferentes estados

// Configuración de los pasos
const steps = [
  { label: "Recibimos el pedido", icon: <AssignmentTurnedIn /> },
  { label: "Pedido confirmado", icon: <LocalShipping /> },
  { label: "¡Tú pedido está listo!", icon: <ShoppingBag /> },
  { label: "Pedido entregado", icon: <CheckCircle /> },
];

const SeguimientoPedido = () => {
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
          width: "500px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        {/* Título */}
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          Seguimiento de pedido
        </Typography>

        {/* Identificador del pedido */}
        <Typography variant="subtitle1" sx={{ marginBottom: "24px", fontWeight: "bold" }}>
          Pedido ####
        </Typography>

        {/* Progreso del pedido */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepConnector-root": {
              top: "18px",
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={(props) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: props.completed || props.active ? "#62C3D9" : "#ddd",
                      color: "#fff",
                    }}
                  >
                    {step.icon}
                  </Box>
                )}
              >
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default SeguimientoPedido;


/*const SeguimientoPedido = () => {
    return <h2>SeguimientoPedido</h2>;
  };
  
  export default SeguimientoPedido;*/