import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TaskFormComponent } from './task-form.component';
import { createTask, updateTask } from '../../store/actions/task.action';
import { closeModal } from '../../store/actions/modal.action';
import { DatePipe } from '@angular/common';
import { Task } from '../../models/task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let store: MockStore;
  const initialState = { modal: { task: null } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState }), DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.taskForm.value).toEqual({
      title: '',
      date: '',
      priority: 'LOW',
      completed: false,
    });
  });

  it('should populate the form when a task is provided', () => {
    const task = {
      id: 1,
      title: 'Test Task',
      date: '2025-04-12T00:00:00',
      priority: 'HIGH',
      completed: true,
    };
    store.setState({ modal: { task } });
    store.refreshState();
    fixture.detectChanges();

    expect(component.taskForm.value).toEqual({
      title: 'Test Task',
      date: '2025-04-12',
      priority: 'HIGH',
      completed: true,
    });
  });

  it('should dispatch updateTask and closeModal when saving an existing task', () => {
    spyOn(store, 'dispatch');
    const task: Task = {
      id: 1,
      title: 'Test Task',
      date: '2025-04-12T00:00:00',
      priority: 'HIGH',
      completed: true,
    };
    component.task = task;
    component.taskForm.setValue({
      title: 'Updated Task',
      date: '2025-04-13',
      priority: 'MEDIUM',
      completed: false,
    });

    component.save();

    expect(store.dispatch).toHaveBeenCalledWith(
      updateTask({
        task: {
          id: 1,
          title: 'Updated Task',
          date: '2025-04-13',
          priority: 'MEDIUM',
          completed: false,
        },
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(closeModal());
  });

  it('should dispatch createTask and closeModal when saving a new task', () => {
    spyOn(store, 'dispatch');
    component.task = null;
    component.taskForm.setValue({
      title: 'New Task',
      date: '2025-04-12',
      priority: 'LOW',
      completed: false,
    });

    component.save();

    expect(store.dispatch).toHaveBeenCalledWith(
      createTask({
        task: {
          title: 'New Task',
          date: '2025-04-12',
          priority: 'LOW',
          completed: false,
        },
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(closeModal());
  });

  it('should reset the form and dispatch closeModal when close is called', () => {
    spyOn(store, 'dispatch');
    component.close();
    expect(component.taskForm.pristine).toBeTrue();
    expect(store.dispatch).toHaveBeenCalledWith(closeModal());
  });
});
