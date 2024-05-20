import { createClient } from "@/lib/client";
import CardComponent from "./components/card";

async function getCursos() {
  const supabase = createClient();

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

async function CursoPage() {
  const cursos = await getCursos();
  return (
    <div className="flex m-2 flex-wrap">
      {cursos.map((curso) => (
        <CardComponent key={curso.id} Curso={curso} />
      ))}
    </div>
  );
}

export default CursoPage;
