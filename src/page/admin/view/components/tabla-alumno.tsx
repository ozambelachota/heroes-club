import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../server";

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
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar alumnos</p>;
  }

  if (!alumnos) {
    return <p>No hay alumnos</p>;
  }

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>DNI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno, index) => (
              <TableRow key={alumno.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{alumno.estudiante_nombre}</TableCell>
                <TableCell>{alumno.estudiante_apellidos}</TableCell>
                <TableCell>{alumno.estudiante_dni}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
