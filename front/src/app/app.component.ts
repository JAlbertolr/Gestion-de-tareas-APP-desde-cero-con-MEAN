import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';


@Component({
  selector: 'app-root',
  template: `
    <app-task-form (taskCreated)="taskList.loadTasks()"></app-task-form>
    <app-task-list #taskList></app-task-list>
  `,
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent], 
})
export class AppComponent {}



