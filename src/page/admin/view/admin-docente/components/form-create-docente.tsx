import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { supabase } from "../../../../../server";

const formDocenteSchema = z.object({
  dni: z.string().length(8, "El DNI debe tener 8 caracteres"),
  nombre: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  apellidos: z.string().min(4, "El apellido debe tener al menos 4 caracteres"),
  fechaNacimiento: z.date({
    required_error: "La fecha de nacimiento es requerida",
    invalid_type_error: "La fecha de nacimiento debe ser una fecha válida",
  }),
  estado: z.boolean().default(true),
  userId: z.string().uuid(),
});
type formTypeDocente = z.infer<typeof formDocenteSchema>;

export default function FormCreateDocente() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formTypeDocente>({
    defaultValues: {
      dni: "",
      nombre: "",
      apellidos: "",
      fechaNacimiento: new Date(),
      estado: true,
      userId: "",
    },
    resolver: zodResolver(formDocenteSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: formTypeDocente) => {
      const { data: docente, error } = await supabase
        .from("docente")
        .insert({
          docente_nombre: data.nombre,
          docente_apellidos: data.apellidos,
          docente_fecha_nacimiento: data.fechaNacimiento.toISOString(),
          docente_estado: data.estado,
          user_id: data.userId,
          docente_dni: data.dni,
        })
        .select("*");
      if (error) {
        throw error;
      }
      return docente;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["docentes"] });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const onCreateDocente: SubmitHandler<formTypeDocente> = (data) => {
    mutation.mutate(data);
    reset();
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("role", "docente");
      if (error) {
        throw error;
      }
      return data;
    },
  });
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profile").select("*");
      if (error) {
        throw error;
      }

      return data;
    },
  });
  console.log(profile);

  const filterProfile = profile?.filter((profile) => {
    return users?.find((user) => user.id === profile.id);
  });
  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onCreateDocente)}
      >
        <Controller
          name="dni"
          control={control}
          render={({ field }) => (
            <TextField
              label="DNI"
              error={!!errors.dni}
              helperText={errors.dni ? errors.dni.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nombre"
              error={!!errors.nombre}
              helperText={errors.nombre ? errors.nombre.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="apellidos"
          control={control}
          render={({ field }) => (
            <TextField
              label="Apellidos"
              error={!!errors.apellidos}
              helperText={errors.apellidos ? errors.apellidos.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="fechaNacimiento"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Fecha de inicio"
              value={dayjs(field.value)}
              onChange={(date) => field.onChange(date ? date.toDate() : null)}
              slotProps={{
                textField: {
                  error: !!errors.fechaNacimiento,
                  helperText: errors.fechaNacimiento
                    ? errors.fechaNacimiento.message
                    : "",
                },
              }}
            />
          )}
        />
        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} defaultChecked={field.value} />}
              label="estado docente"
            />
          )}
        />
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel id="docente">seleccionar usuario</InputLabel>
              <Select labelId="docente" {...field} error={!!errors.userId}>
                <MenuItem value={0}>Selecciona un usuario</MenuItem>
                {isLoading ? (
                  <MenuItem value="">Cargando...</MenuItem>
                ) : (
                  filterProfile?.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.email}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.userId && (
                <Typography color="error">{errors.userId.message}</Typography>
              )}
            </FormControl>
          )}
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          variant="contained"
          color="primary"
        >
          Crear
        </Button>
        {mutation.isError && (
          <Typography variant="h5" color="errror">
            {mutation.error.message}
          </Typography>
        )}
        {mutation.isSuccess && toast.success("Docente creado")}
      </form>
      <Toaster position="top-right" theme={"system"} duration={5000} />
    </div>
  );
}
