import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [FormsModule],
})
export class TaskFormComponent {
  title: string = '';
  description: string = '';

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.title) {
      alert('El título es obligatorio');
      return;
    }

    const newTask: Task = {
      id: '', // Esto se generará en el backend
      title: this.title,
      description: this.description,
      completed: false,
    };

    this.taskService.createTask(newTask).subscribe((task) => {
      this.taskCreated.emit(task); // Emitir evento para que el componente padre sepa que se creó una tarea
      this.title = '';
      this.description = '';
    }, error => {
      console.error('Error al crear la tarea:', error);
    });
  }
}

