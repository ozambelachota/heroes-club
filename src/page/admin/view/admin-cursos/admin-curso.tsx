import { Typography } from "@mui/material";
import FormCreateCategorias from "./components/form-create-categorias";
import FormCreateCurso from "./components/form-create-curso";
import TableCurso from "./components/table-curso";

function AdminCursos() {
  return (
    <div className="flex flex-col  gap-4">
      <Typography variant="h4" align="center" className="col-span-2">
        Gestión de Cursos
      </Typography>
      <div className="flex justify-center items-center ">
        <div className="flex justify-center items-center">
          <FormCreateCurso />
        </div>
        <div className="flex justify-center items-center">
          <FormCreateCategorias />
        </div>
      </div>
      <div className="flex justify-center items-center col-span-2">
        <TableCurso />
      </div>
    </div>
  );
}

export default AdminCursos;
