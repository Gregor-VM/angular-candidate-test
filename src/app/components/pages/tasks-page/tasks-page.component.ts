import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { TasksComponent } from '../../common/tasks/tasks.component';

@Component({
  selector: 'app-page-tasks',
  standalone: true,
  imports: [
    NavbarComponent,
    TasksComponent
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPageComponent {

}
