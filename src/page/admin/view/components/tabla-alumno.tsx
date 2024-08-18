import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../server";
import { Link } from "react-router-dom";

export const TablaAlumno = () => {
  const {
    data: alumnos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["alumnos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("estudiante").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error al cargar alumnos</p>;
  }

  if (!alumnos) {
    return <p>No hay alumnos</p>;
  }

  return (
    <Container>
      <TableContainer component={Paper} color="secondary">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno, index) => (
              <TableRow key={alumno.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{alumno.estudiante_nombre}</TableCell>
                <TableCell>{alumno.estudiante_apellidos}</TableCell>
                <TableCell>{alumno.estudiante_dni}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success">
                    ver notas
                  </Button>
                  <Button variant="contained" color="primary">
                    <Link to={`/admin/alumnos/notas/${alumno.id}`}>
                    Ingresar notas
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
