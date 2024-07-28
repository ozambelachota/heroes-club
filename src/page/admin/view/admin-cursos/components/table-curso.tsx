import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../../server";

function TableCurso() {
  const {
    data: cursos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cursos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cursos")
        .select(
          "*, categoria(categoria_area), docente(docente_nombre, docente_apellidos)"
        );
      if (error) throw error;
      return data;
    },
  });
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Fecha de inicio</TableCell>
              <TableCell>fecha final del curso</TableCell>
              <TableCell>docente</TableCell>
              <TableCell>duracion del curso</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7}>Cargando...</TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={7}>Error al cargar los datos</TableCell>
              </TableRow>
            ) : !cursos || cursos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>No hay datos disponibles</TableCell>
              </TableRow>
            ) : (
              cursos &&
              cursos.map((curso, index) => (
                <TableRow key={curso.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{curso.curso_nombre}</TableCell>
                  <TableCell>{curso.categoria?.categoria_area}</TableCell>
                  <TableCell>{curso.curso_fecha_inicio}</TableCell>
                  <TableCell>{curso.curso_fecha_final}</TableCell>
                  <TableCell>
                    {curso.docente ? (
                      `${curso.docente.docente_nombre} ${curso.docente.docente_apellidos}`
                    ) : (
                      <span>No asignado</span>
                    )}
                  </TableCell>
                  <TableCell>{curso.curso_duracion}</TableCell>
                  <TableCell>
                    <Button>Editar</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableCurso;
