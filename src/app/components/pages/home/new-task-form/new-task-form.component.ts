import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../ui/input/input.component';
import { CheckboxComponent } from '../../../ui/checkbox/checkbox.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextAreaComponent } from '../../../ui/textarea/textarea.component';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../types/task';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-task-form',
  standalone: true,
  imports: [
    InputComponent,
    CheckboxComponent,
    TextAreaComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './new-task-form.component.html',
  styleUrl: './new-task-form.component.scss'
})
export class NewTaskFormComponent {

  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  public showErrors = false;

  taskForm = this._formBuilder.group({
    name: ['', Validators.required],
    content: ['', Validators.required],
    done: [false]
  })

  get nameError(){
    return this.showErrors && this.taskForm.get("name")?.errors?.['required']
  }

  get contentError(){
    return this.showErrors && this.taskForm.get("content")?.errors?.['required']
  }

  saveTask(){

    if(this.taskForm.valid){
      this._taskService.addTask(this.taskForm.value as Task);
      this.taskForm.reset();
      this.showErrors = false;
    } else {
      this.showErrors = true;
    }
    
  }

}
