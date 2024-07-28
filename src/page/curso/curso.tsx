import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../server";
import CardComponent from "./components/card";

async function getCursos() {
  const { data, error } = await supabase
    .from("cursos")
    .select(
      " id, curso_nombre, curso_duracion, curso_fecha_inicio, curso_fecha_final"
    )
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export const Cursos = () => {
  const {
    data: cursos,
    isError,
    isFetching,
  } = useQuery({ queryKey: ["cursos"], queryFn: getCursos });
  if (isError) {
    return <div>Error</div>;
  }
  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <div className="flex m-2 flex-wrap">
      {cursos &&
        cursos.map((curso) => <CardComponent key={curso.id} Curso={curso} />)}
    </div>
  );
};
