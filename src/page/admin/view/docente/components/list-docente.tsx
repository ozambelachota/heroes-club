import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../../server";

export default function ListDocentes() {
  const { data: docentes, isLoading } = useQuery({
    queryKey: ["docentes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("docente").select("*");
      if (error) {
        throw error;
      }
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
              <TableCell>DNI</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>APELLIDO</TableCell>
              <TableCell>ESTADO</TableCell>
              <TableCell>FECHA DE NACIMIENTO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>Cargando...</TableCell>
              </TableRow>
            ) : docentes && docentes.length > 0 ? (
              docentes.map((docente) => (
                <TableRow
                  key={docente.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{docente.id}</TableCell>
                  <TableCell>{docente.docente_dni}</TableCell>
                  <TableCell>{docente.docente_nombre}</TableCell>
                  <TableCell>{docente.docente_apellidos}</TableCell>
                  <TableCell>
                    {docente.docente_estado ? "Activo" : "Inactivo"}
                  </TableCell>
                  <TableCell>{docente.docente_fecha_nacimiento}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No hay docentes</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
