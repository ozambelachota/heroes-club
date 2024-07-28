import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "../../../../../server";

const CategoriaSchema = z.object({
  nombre: z
    .string()
    .min(4, { message: "El nombre debe tener al menos 4 caracteres" }),
});

type FormCategoriasType = z.infer<typeof CategoriaSchema>;

function FormCreateCategorias() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCategoriasType>({
    resolver: zodResolver(CategoriaSchema),
    defaultValues: {
      nombre: "", // Valor inicial definido
    },
  });
  const mutation = useMutation({
    mutationFn: async (newCategoria: { nombre: string }) => {
      const { data, error } = await supabase
        .from("categoria")
        .insert({
          categoria_area: newCategoria.nombre,
        })
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Assuming queryClient is imported from react-query

      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
  const onCategorySubmit: SubmitHandler<FormCategoriasType> = (data) => {
    mutation.mutate({
      nombre: data.nombre,
    });
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography variant="h4" align="center">
        Crear Categorias
      </Typography>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onCategorySubmit)}
      >
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <TextField
              type="text"
              label="Nombre de la categoria"
              placeholder="Nombre"
              {...field}
              error={!!errors.nombre}
              helperText={errors.nombre ? errors.nombre.message : ""}
            />
          )}
        />
        <Button
          disabled={mutation.isPending}
          variant="contained"
          color="success"
          type="submit"
        >
          {mutation.isPending ? "Creando..." : "Crear categoria"}
        </Button>
      </form>
    </div>
  );
}

export default FormCreateCategorias;
