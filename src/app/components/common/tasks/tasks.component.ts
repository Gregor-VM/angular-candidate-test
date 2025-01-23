import { Component, computed, inject, Input, signal } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { NgClass, SlicePipe } from '@angular/common';
import { InputComponent } from "../../ui/input/input.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskStatusFilter } from '../../../types/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    SlicePipe,
    NgClass,
    NgClass,
    FormsModule,
],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  @Input() fullpage = false;

  private _taskService = inject(TaskService);
  private _router = inject(Router);

  searchTerm = signal("");
  taskStatusFilter = signal<TaskStatusFilter>(TaskStatusFilter.ALL);

  get filteredTasks(){
    //return this._taskService.taskList;
    return computed(() => {
      return this._taskService.taskList().filter(task => {
        return task.content.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase()) || task.name.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase())
      }).filter(task => {
        if(this.taskStatusFilter() === TaskStatusFilter.ALL) return true;
        if(this.taskStatusFilter() === TaskStatusFilter.DONE) return task.done;
        if(this.taskStatusFilter() === TaskStatusFilter.PENDING) return !task.done;
        else return false;
      })
    })
  }

  toggleTaskState(event: Event, id: number | undefined){
    event.stopPropagation();
    if(typeof id === "number") this._taskService.toggleTaskDone(id);
  }

  deleteTask(event: Event, id: number | undefined){
    event.stopPropagation();
    if(typeof id === "number") {
      if(confirm("Are you sure you want to delete this task?")) {
        this._taskService.removeTask(id);
      }
    }
  }

  viewTask(id: number | undefined){
    if(typeof id === "number") this._router.navigate(["/task", id]);
  }

}
