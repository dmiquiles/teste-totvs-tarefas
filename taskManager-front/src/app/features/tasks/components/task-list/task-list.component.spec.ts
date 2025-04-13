import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { toggleTaskComplete } from '../../store/actions/task.action';
import { openModal, openDeleteModal } from '../../store/actions/modal.action';
import { selectCurrentFilter } from '../../store/selectors/filter.selectors';
import { selectSearchTerm } from '../../store/selectors/search.selectors';
import { Task } from '../../models/task.model';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;
  const initialState = {
    filter: 'Todas',
    searchTerm: '',
  };
  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', completed: false, priority: 'LOW' } as Task,
    { id: 2, title: 'Task 2', completed: true, priority: 'HIGH' } as Task,
    { id: 3, title: 'Another Task', completed: false, priority: 'MEDIUM' } as Task,
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'select').and.callFake((selector) => {
      if (selector === selectCurrentFilter) {
        return of('Todas');
      }
      if (selector === selectSearchTerm) {
        return of('');
      }
      return of(null);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter tasks based on "Todas" filter and empty search term', () => {
    component.tasks = mockTasks;

    component.ngOnChanges({
      tasks: {
        currentValue: component.tasks,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    component.filteredTasks$.subscribe((filteredTasks) => {
      expect(filteredTasks.length).toBe(3);
    });
  });

  // it('should filter tasks based on "Ativas" filter', () => {
  //   spyOn(store, 'select').and.callFake((selector) => {
  //     if (selector === selectCurrentFilter) {
  //       return of('Ativas');
  //     }
  //     if (selector === selectSearchTerm) {
  //       return of('');
  //     }
  //     return of(null);
  //   });

  //   component.tasks = mockTasks;

  //   component.ngOnChanges({
  //     tasks: {
  //       currentValue: component.tasks,
  //       previousValue: null,
  //       firstChange: true,
  //       isFirstChange: () => true,
  //     },
  //   });

  //   component.filteredTasks$.subscribe((filteredTasks) => {
  //     expect(filteredTasks.length).toBe(2);
  //     expect(filteredTasks.every((task) => !task.completed)).toBeTrue();
  //   });
  // });

  // it('should filter tasks based on "Concluídas" filter', () => {
  //   spyOn(store, 'select').and.callFake((selector) => {
  //     if (selector === selectCurrentFilter) {
  //       return of('Concluídas');
  //     }
  //     if (selector === selectSearchTerm) {
  //       return of('');
  //     }
  //     return of(null);
  //   });

  //   component.tasks = mockTasks;

  //   component.ngOnChanges({
  //     tasks: {
  //       currentValue: component.tasks,
  //       previousValue: null,
  //       firstChange: true,
  //       isFirstChange: () => true,
  //     },
  //   });

  //   component.filteredTasks$.subscribe((filteredTasks) => {
  //     expect(filteredTasks.length).toBe(1); // Only completed tasks should be included
  //     expect(filteredTasks.every((task) => task.completed)).toBeTrue();
  //   });
  // });

  // it('should filter tasks based on search term', () => {
  //   spyOn(store, 'select').and.callFake((selector) => {
  //     if (selector === selectCurrentFilter) {
  //       return of('Todas'); // Default filter
  //     }
  //     if (selector === selectSearchTerm) {
  //       return of('Task'); // Search term
  //     }
  //     return of(null);
  //   });

  //   component.tasks = mockTasks;

  //   component.ngOnChanges({
  //     tasks: {
  //       currentValue: component.tasks,
  //       previousValue: null,
  //       firstChange: true,
  //       isFirstChange: () => true,
  //     },
  //   });

  //   component.filteredTasks$.subscribe((filteredTasks) => {
  //     expect(filteredTasks.length).toBe(2); // Only tasks matching "Task" should be included
  //     expect(filteredTasks.every((task) => task.title.includes('Task'))).toBeTrue();
  //   });
  // });


























  it('should dispatch toggleTaskComplete when toggleComplete is called', () => {
    spyOn(store, 'dispatch');
    const task = { id: 1, title: 'Task 1', completed: false, priority: 'LOW' } as Task;

    component.toggleComplete(task);

    expect(store.dispatch).toHaveBeenCalledWith(toggleTaskComplete({ task }));
  });

  it('should dispatch openModal when editTask is called', () => {
    spyOn(store, 'dispatch');
    const task = { id: 1, title: 'Task 1', completed: false, priority: 'LOW' } as Task;

    component.editTask(task);

    expect(store.dispatch).toHaveBeenCalledWith(openModal({ task }));
  });

  it('should dispatch openDeleteModal when deleteTask is called', () => {
    spyOn(store, 'dispatch');
    const taskId = '1';

    component.deleteTask(taskId);

    expect(store.dispatch).toHaveBeenCalledWith(openDeleteModal({ taskId }));
  });

  it('should normalize priority correctly', () => {
    const task: Task = {
      id: 1,
      title: 'Test Task',
      date: '2025-04-12T00:00:00',
      priority: 'HIGH',
      completed: true,
    };

    const normalizedPriority = component.normalizePriority(task);

    expect(normalizedPriority).toBe('high');
  });
});