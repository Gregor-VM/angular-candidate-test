import { Component } from '@angular/core';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { TasksComponent } from "../../common/tasks/tasks.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NewTaskFormComponent,
    NavbarComponent,
    TasksComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
