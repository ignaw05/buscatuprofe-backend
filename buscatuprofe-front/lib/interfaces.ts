export interface Clase {
  id: number;
  nombre: string;
  profesor: string;
  descripcion: string;
  provincia: string;
  precio: number;
  duracion: string;
  modalidad: string;
  nivel: string;
  materias: string[];
}

export interface Profesor {
  id: number;
  nombre: string;
  telefono: string;
  mail: string;
  titulos: string[];
  disponibilidad: string[]
}

export interface ClaseID {
  id: number;
  nombre: string;
  profesor: Profesor;
  descripcion: string;
  provincia: string;
  precio: number;
  duracion: string;
  modalidad: string;
  nivel: string;
  materias: string[];
}

export interface ClaseProfID {
  id: number;
  nombre: string;
  descripcion: string;
  provincia: string;
  precio: number;
  duracion: string;
  modalidad: string;
  nivel: string;
  materias: string[];
}
