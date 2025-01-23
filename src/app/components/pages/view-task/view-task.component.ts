import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Location, NgClass } from '@angular/common';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [
    NavbarComponent,
    NgClass
  ],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit {

  private _location = inject(Location);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _taskService = inject(TaskService);

  get task(){
    const id = parseInt(this._activatedRoute.snapshot.paramMap.get('id') || "");
    return this._taskService.getTaskById(id);
  }

  ngOnInit(){

    if(!this.task) this._router.navigate(["/"]);

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
        this._router.navigate(["/"]);
      }
    }
  }

  goBack(){
    this._location.back();
  }

}
