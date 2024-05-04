import CardComponent from "./components/card";

const Cursos = [
  {
    id: 1,
    name: "Curso 1",
    description: "Un curso de prueba",
  },
  {
    id: 2,
    name: "Curso 2",
    description: "Un curso de prueba",
  },
  {
    id: 3,
    name: "Curso 3",
    description: "Un curso de prueba",
  },
];

function CursoPage() {
  return (
    <div className="flex m-2 flex-wrap">
      {Cursos.map((curso) => (
        <CardComponent key={curso.id} Curso={curso} />
      ))}
    </div>
  );
}

export default CursoPage;
