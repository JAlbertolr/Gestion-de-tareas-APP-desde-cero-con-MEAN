import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule, NgIf]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  taskToDelete: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks(); // Cargar tareas al iniciar
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks.map(task => ({
            id: task['_id'], 
            title: task.title,
            description: task.description,
            completed: task.completed,
        }));
    });
  }

  deleteTask(id: string) {
    this.taskToDelete = this.tasks.find(task => task.id === id) || null;
    this.selectedTask = null; // Desactivar edición al eliminar
  }

  confirmDelete() {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete.id).subscribe(() => {
          this.loadTasks(); // Recargar tareas después de eliminar
          this.taskToDelete = null; // Reiniciar la tarea a eliminar
      });
    }
  }

  cancelDelete() {
    this.taskToDelete = null; // Reiniciar la tarea a eliminar
  }

  selectTaskForUpdate(task: Task) {
    this.selectedTask = { ...task }; // Clonar la tarea seleccionada
    this.taskToDelete = null; // Desactivar eliminación al editar
  }

  updateTask() {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask).subscribe(() => {
        this.loadTasks(); // Recargar tareas después de actualizar
        this.selectedTask = null; // Limpiar selección
      });
    }
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed; // Cambiar estado de completada
    this.taskService.updateTask(task).subscribe(() => {
      this.loadTasks(); // Recargar tareas después de actualizar
    });
  }

  toggleEdit(task: any) {
    if (this.selectedTask && this.selectedTask.id === task.id) {
      this.selectedTask = null; // Deseleccionar si es la misma tarea
    } else {
      this.selectedTask = { ...task }; // Hacer una copia para editar
      this.taskToDelete = null; // Desactivar eliminación al editar
    }
  }

  cancelEdit() {
    this.selectedTask = null; // Limpiar selección
  }
}
