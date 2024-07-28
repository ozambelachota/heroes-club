import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { supabase } from "../../../../../server";

// Define the form schema
const formSchema = z
  .object({
    "nombre-curso": z.string().min(1, "El nombre del curso es obligatorio"),
    categoria: z.number().min(1, "Selecciona una categoría"),
    fechaInicio: z.date({ required_error: "Fecha de inicio es obligatoria" }),
    fechaFin: z.date({ required_error: "Fecha de fin es obligatoria" }),
    docente: z.number().min(1, "Selecciona un docente"),
  })
  .superRefine((data, ctx) => {
    if (data.fechaFin <= data.fechaInicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fechaFin"],
        message: "La fecha de fin debe ser posterior a la fecha de inicio",
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

// Function to calculate the number of months between two dates
const calculateMonths = (startDate: Date, endDate: Date) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // Calcular la diferencia en meses
  const months = end.diff(start, "month", true);

  // Si el final no llega al último mes completo, ajustar el valor
  return Math.ceil(months);
};
export default function FormCreateCurso() {
  const queryClient = useQueryClient();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "nombre-curso": "",
      categoria: 0,
      fechaInicio: dayjs().toDate(), // Use dayjs().toDate() to initialize with a valid Date object
      fechaFin: dayjs().toDate(), // Use dayjs().toDate() to initialize with a valid Date object
    },
  });

  const { data: categorias, isLoading } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categoria").select("*");
      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newCurso: {
      nombre: string;
      categoria_id: number;
      fechaInicio: Date;
      fechaFin: Date;
      meses: number;
      docente_id: number;
    }) => {
      const { data, error } = await supabase
        .from("cursos")
        .insert({
          curso_nombre: newCurso.nombre,
          categoria_id: newCurso.categoria_id,
          curso_fecha_inicio: dayjs(newCurso.fechaInicio).toISOString(), // Convert to ISO string
          curso_fecha_final: dayjs(newCurso.fechaFin).toISOString(), // Convert to ISO string
          curso_duracion: newCurso.meses,
          docente_id: newCurso.docente_id,
        })
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
  const { data: docentes, isLoading: isloadingDocente } = useQuery({
    queryKey: ["docentes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("docente").select("*");
      if (error) throw error;
      return data;
    },
  });

  const onCreateCurso: SubmitHandler<FormData> = (data) => {
    const meses = calculateMonths(data.fechaInicio, data.fechaFin);
    mutation.mutate({
      nombre: data["nombre-curso"],
      categoria_id: data.categoria,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      meses,
      docente_id: data.docente,
    });
    reset();
  };

  return (
    <div className="">
      <Typography variant="h4" align="center">
        Crear Curso
      </Typography>
      <Container maxWidth="sm">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onCreateCurso)}
        >
          <Controller
            name="nombre-curso"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del curso"
                error={!!errors["nombre-curso"]}
                helperText={
                  errors["nombre-curso"] ? errors["nombre-curso"].message : ""
                }
              />
            )}
          />
          <Controller
            name="categoria"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="categoria-label">Categoría</InputLabel>
                <Select
                  labelId="categoria-label"
                  {...field}
                  error={!!errors.categoria}
                >
                  <MenuItem value={0}>Selecciona una categoría</MenuItem>
                  {isLoading ? (
                    <MenuItem value="">Cargando...</MenuItem>
                  ) : (
                    categorias?.map((categoria) => (
                      <MenuItem key={categoria.id} value={categoria.id}>
                        {categoria.categoria_area}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.categoria && (
                  <Typography color="error">
                    {errors.categoria.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="fechaInicio"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Fecha de inicio"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                slotProps={{
                  textField: {
                    error: !!errors.fechaInicio,
                    helperText: errors.fechaInicio
                      ? errors.fechaInicio.message
                      : "",
                  },
                }}
              />
            )}
          />
          <Controller
            name="fechaFin"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Fecha de fin"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                slotProps={{
                  textField: {
                    error: !!errors.fechaFin,
                    helperText: errors.fechaFin ? errors.fechaFin.message : "",
                  },
                }}
              />
            )}
          />
          <Controller
            name="docente"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="docente-label">Docente</InputLabel>
                <Select
                  labelId="docente-label"
                  {...field}
                  error={!!errors.docente}
                >
                  <MenuItem value={0}>Selecciona un docente</MenuItem>
                  {isloadingDocente ? (
                    <MenuItem value="">Cargando...</MenuItem>
                  ) : (
                    docentes?.map((docente) => (
                      <MenuItem key={docente.id} value={docente.id}>
                        {docente.docente_nombre} {docente.docente_apellidos}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.docente && (
                  <Typography color="error">
                    {errors.docente.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creando..." : "Crear curso"}
          </Button>
          {mutation.isError && (
            <Typography color="error">
              Error creando el curso: {mutation.error.message}
            </Typography>
          )}
        </form>
      </Container>

      {mutation.isSuccess && toast.success("Curso creado correctamente")}
      <Toaster theme="system" position="top-center" duration={4000} />
    </div>
  );
}
