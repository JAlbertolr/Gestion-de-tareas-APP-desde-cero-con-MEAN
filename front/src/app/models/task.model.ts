export interface Task {
    [x: string]: any;
    id: string;        // Identificador único de la tarea
    title: string;     // Título de la tarea
    description?: string; // Descripción opcional de la tarea
    completed: boolean; // Estado de la tarea (completada o no)
  }
  