import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../models/task.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { createTask } from '../../store/actions/task.action';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Output() closeModal = new EventEmitter();

  taskForm: FormGroup<{
    title: FormControl<string>;
    date: FormControl<string>;
    priority: FormControl<'Baixa' | 'Média' | 'Alta'>;
    completed: FormControl<boolean>;
  }>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = this.fb.group({
      title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
      date: this.fb.nonNullable.control('', Validators.required),
      priority: this.fb.nonNullable.control<'Baixa' | 'Média' | 'Alta'>('Baixa', Validators.required),
      completed: this.fb.nonNullable.control(false)
    });
  }

  salvar() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.getRawValue();
      this.store.dispatch(createTask({ task }));
      this.taskForm.reset();
      this.closeModal.emit();
    }
  }

}
