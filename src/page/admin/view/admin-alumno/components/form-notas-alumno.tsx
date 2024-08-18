import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";
import { supabase } from "../../../../../server";

const formSchema = z.object({});

export default function FormNotasAlumno() {
  const { control } = useForm();
  const { data: cursos, isLoading } = useQuery({
    queryKey: ["alumnos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cursos")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        throw new Error("Error al obtener los alumnos");
      }
      return data;
    },
  });
  return (
    <div>
      <Typography>Ingresar notas</Typography>
      <form>
        <Controller
          name="nombreAlumno"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre del Alumno"
              variant="outlined"
              disabled
            />
          )}
        />
        <Controller
          name="nota"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nota"
              variant="outlined"
              type="number"
            />
          )}
        />
        <Controller
        name="curso"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Curso" variant="outlined">
            <MenuItem value={0}>Selecciona un curso</MenuItem>
            {isLoading ? (
              <MenuItem value="">Cargando...</MenuItem>
            ) : (
              cursos?.map((curso) => (
                <MenuItem key={curso.id} value={curso.id}>
                  {curso.curso_nombre}
                </MenuItem>
              ))
            )}
          </Select>
        )}
        />
      </form>
    </div>
  );
}
