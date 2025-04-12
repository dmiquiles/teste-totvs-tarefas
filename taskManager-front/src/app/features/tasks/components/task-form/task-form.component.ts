import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../models/task.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { createTask, updateTask } from '../../store/actions/task.action';
import { closeModal } from '../../store/actions/modal.action';
import { selectModalOpen, selectModalTask } from '../../store/selectors/modal.selectors';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [DatePipe],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  taskForm: FormGroup<{
    title: FormControl<string>;
    date: FormControl<string>;
    priority: FormControl<'LOW' | 'MEDIUM' | 'HIGH'>;
    completed: FormControl<boolean>;
  }>;
  task: Task | null = null;

  constructor(private fb: FormBuilder, private store: Store, private datePipe: DatePipe) {
    this.taskForm = this.fb.group({
      title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
      date: this.fb.nonNullable.control('', Validators.required),
      priority: this.fb.nonNullable.control<'LOW' | 'MEDIUM' | 'HIGH'>('LOW', Validators.required),
      completed: this.fb.nonNullable.control(false)
    });
  }

  ngOnInit() {
    this.store.select(selectModalTask).subscribe((modalState) => {
      this.task = modalState;
      console.log(this.task);
      if (this.task) {
        const date = this.datePipe.transform(this.task.date, 'yyyy-MM-dd') || '';
        console.log(date);
        this.taskForm = this.fb.group({
          title: this.fb.nonNullable.control(this.task.title, [Validators.required, Validators.maxLength(100)]),
          date: this.fb.nonNullable.control(date, Validators.required),
          priority: this.fb.nonNullable.control<'LOW' | 'MEDIUM' | 'HIGH'>(this.task.priority, Validators.required),
          completed: this.fb.nonNullable.control(this.task.completed)
        });
      }
    });
  }

  save() {
    if (this.task && this.taskForm.valid) {
      const updatedTask = { ...this.task, ...this.taskForm.value };
      this.store.dispatch(updateTask({ task: updatedTask })); // Dispara a ação para atualizar a tarefa
    } else if (this.taskForm.valid) {
      const task: Task = this.taskForm.getRawValue();
      this.store.dispatch(createTask({ task }));
    }
    this.taskForm.reset();
    this.store.dispatch(closeModal());
  }

  close() {
    this.store.dispatch(closeModal());
  }

}
