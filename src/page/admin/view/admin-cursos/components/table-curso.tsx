import {
  Button,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../../../../../server";
import { Curso, useCursoStore } from "../store/curso.store";
import FormEditCurso from "./form-edit-curso";

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
        )
        .order("id", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  const [open, setOpen] = useState(false);

  const setCurso = useCursoStore((state) => state.setCursos);
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = (curso: Curso) => {
    setCurso(curso);
    setOpen(true);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className="bg-slate-500">
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
                  <TableCell>{curso.curso_duracion + " MESES"} </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleEditClick({
                          docente_id: curso.docente_id ?? 0,
                          fecha_inicio: curso.curso_fecha_inicio
                            ? new Date(curso.curso_fecha_inicio)
                            : new Date(),
                          fecha_final: curso.curso_fecha_final
                            ? new Date(curso.curso_fecha_final)
                            : new Date(),
                          nombre: curso.curso_nombre,
                          id: curso.id,
                          categoria_id: curso.categoria_id ?? 0,
                          duracion: curso.curso_duracion ?? "",
                        });
                      }}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Container maxWidth="sm" className="flex justify-center items-center">
          <FormEditCurso onClose={handleClose} />
        </Container>
      </Modal>
    </div>
  );
}

export default TableCurso;
