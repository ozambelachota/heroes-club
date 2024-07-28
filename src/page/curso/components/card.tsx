
interface CardProps {
  Curso: {
    id: number;
    curso_nombre: string | null;
    curso_duracion: number | null;
    curso_fecha_inicio: string | null;
    curso_fecha_final: string | null;
  };
}

function CardComponent({ Curso }: CardProps) {
  return (
    <div
      className="max-w-xs p-3 mx-3 my-2
     bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {Curso.curso_nombre}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Duracion: {Curso.curso_duracion} MESES
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {Curso.curso_fecha_inicio} - {Curso.curso_fecha_final}
      </p>
    </div>
  );
}

export default CardComponent;