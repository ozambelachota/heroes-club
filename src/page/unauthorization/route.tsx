import { Typography } from "@mui/material";

export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Typography variant="h2">No autorizado</Typography>
      <Typography variant="body1">
        No tienes permisos para acceder a esta página.
      </Typography>
    </div>
  );
};
