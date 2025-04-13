// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { TaskPageComponent } from './task-page.component';
// import { provideMockStore, MockStore } from '@ngrx/store/testing';
// import { loadTasks } from '../../store/actions/task.action';
// import { selectAllTasks } from '../../store/selectors/task.selectors';
// import { selectIsDeleteModalOpen, selectModalOpen } from '../../store/selectors/modal.selectors';
// import { Task } from '../../models/task.model';
// import { of } from 'rxjs';

// describe('TaskPageComponent', () => {
//   let component: TaskPageComponent;
//   let fixture: ComponentFixture<TaskPageComponent>;
//   let store: MockStore;

//   const mockTasks: Task[] = [
//     { id: 1, title: 'Task 1', completed: false, priority: 'LOW' } as Task,
//     { id: 2, title: 'Task 2', completed: true, priority: 'HIGH' } as Task,
//   ];

//   const initialState = {
//     tasks: mockTasks,
//     modal: { isDeleteModalOpen: false, isModalOpen: false },
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       providers: [provideMockStore({ initialState })],
//     }).compileComponents();

//     fixture = TestBed.createComponent(TaskPageComponent);
//     component = fixture.componentInstance;
//     store = TestBed.inject(MockStore);

//     spyOn(store, 'select').and.callFake((selector) => {
//       if (selector === selectAllTasks) {
//         return of(mockTasks);
//       }
//       if (selector === selectIsDeleteModalOpen) {
//         return of(false);
//       }
//       if (selector === selectModalOpen) {
//         return of(false);
//       }
//       return of(null);
//     });

//     spyOn(store, 'dispatch');
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should dispatch loadTasks on initialization', () => {
//     component.ngOnInit();
//     expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
//   });

//   it('should select tasks from the store', (done) => {
//     component.tasks$.subscribe((tasks) => {
//       expect(tasks).toEqual(mockTasks);
//       done();
//     });
//   });

//   it('should select isDeleteModalOpen from the store', (done) => {
//     component.isDeleteModalOpen$.subscribe((isOpen) => {
//       expect(isOpen).toBeFalse();
//       done();
//     });
//   });

//   it('should select isModalOpen from the store', (done) => {
//     component.isModalOpen$.subscribe((isOpen) => {
//       expect(isOpen).toBeFalse();
//       done();
//     });
//   });

//   // it('should select tasks from the store', (done) => {
//   //   component.tasks$.subscribe((tasks) => {
//   //     expect(tasks).toEqual(mockTasks);
//   //     done();
//   //   });
//   // });

//   // it('should select isDeleteModalOpen from the store', (done) => {
//   //   component.isDeleteModalOpen$.subscribe((isOpen) => {
//   //     expect(isOpen).toBeFalse();
//   //     done();
//   //   });
//   // });

//   // it('should select isModalOpen from the store', (done) => {
//   //   component.isModalOpen$.subscribe((isOpen) => {
//   //     expect(isOpen).toBeFalse();
//   //     done();
//   //   });
//   // });

//   // it('should toggle task completion', () => {
//   //   const task = { id: 1, title: 'Task 1', completed: false, priority: 'LOW' } as Task;
//   //   component.toggleComplete(task);
//   //   expect(task.completed).toBeTrue();
//   // });
// });