import { Injectable, signal, effect } from '@angular/core';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public taskList = signal<Task[]>([]);
  public nextId = signal(0);
  public isDataLoaded = false;

  addTask(newTask: Task) {
    newTask.id = this.nextId();
    this.nextId.update(value => value + 1);
    this.taskList.update(items => {
      const newTaskList = [...items, newTask];
      return newTaskList;
    });
  }

  removeTask(id: number) {
    this.taskList.update(items => {
      return items.filter(task => task.id !== id);
    })
  }

  toggleTaskDone(id: number){
    this.taskList.update(items => {
      return items.map(task => {
        if(task.id === id) return {...task, done: !task.done}
        else return task;
      })
    })
  }

  getTaskById(id: number){
    return this.taskList().find(item => item.id === id);
  }

  saveTaskOnStorage(taskList: Task[], nextId: number){
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", String(nextId));
  }

  constructor() {
    effect(() => {
      this.saveTaskOnStorage(this.taskList(), this.nextId())
    });

    if(!this.isDataLoaded){
      const previousData = localStorage.getItem("tasks");
      if(previousData) this.taskList.set(JSON.parse(previousData));

      const previousId = localStorage.getItem("nextId");
      if(previousId && typeof parseInt(previousId) === "number")  this.nextId.set(parseInt(previousId));

      this.isDataLoaded = true;
    }
  }
}
