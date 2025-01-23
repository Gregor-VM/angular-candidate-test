import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TasksPageComponent } from './components/pages/tasks-page/tasks-page.component';
import { ViewTaskComponent } from './components/pages/view-task/view-task.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'task/:id', component: ViewTaskComponent }
];
