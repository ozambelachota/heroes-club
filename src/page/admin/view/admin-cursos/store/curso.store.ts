import { create } from "zustand";

export interface Curso {
  id: number;
  nombre: string;
  categoria_id: number;
  fecha_inicio: Date;
  fecha_final: Date;
  duracion: number;
  docente_id: number;
}

interface CursoStore {
  curso: Curso;
  setCursos: (curso: Curso) => void;
}

export const useCursoStore = create<CursoStore>((set) => ({
  curso: {
    id: 0,
    nombre: "",
    categoria_id: 0,
    fecha_inicio: new Date(),
    fecha_final: new Date(),
    duracion: 0,
    docente_id: 0,
  },
  setCursos: (curso) => set({ curso }),
}));