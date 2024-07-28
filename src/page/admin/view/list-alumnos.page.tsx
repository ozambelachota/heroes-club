import { Typography } from "@mui/material";
import { TablaAlumno } from "./components/tabla-alumno";

export const AlumnosPage = () => {
  return (
    <div>
      <Typography variant="h3" align="center">Lista de alumnos</Typography>
      <TablaAlumno />
    </div>
  );
};
