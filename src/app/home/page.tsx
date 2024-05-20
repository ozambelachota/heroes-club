import React from 'react'

function HomePage() {
  return (
   
      <main className="grid  justify-center">
        <h1 className="text-3xl text-center">Heroes club academia</h1>
        <section
          className="m-3 bg-slate-600 dark:bg-gray-900
        max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-10 lg:py-24 lg:px-8
        "
        >
          <article>
            somos una academia de reforzamiento para estudiantes de todas las
            edades, tambien brindamos cursos universitarios de reforzamiento.
          </article>
          <article>
            Misión: En nuestra academia, nos comprometemos a brindar una educación
            de reforzamiento que no solo se centre en los resultados exámenes,
            sino que más alla de ellos, nos enfocamos en el pensamiento crítico,
            la creatividad y la confianza en si mismos. Creemos en el poder
            transformador de la educación y nos esforzamos por inspirar a nuestros
            estudiantes a alcanzar sus metas y sueños.
          </article>
        </section>
      </main>
    );
}

export default HomePage