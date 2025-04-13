import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TaskConfirmDialogComponent } from './task-confirm-dialog.component';
import { deleteTask } from '../../store/actions/task.action';
import { closeDeleteModal } from '../../store/actions/modal.action';

describe('TaskConfirmDialogComponent', () => {
  let component: TaskConfirmDialogComponent;
  let fixture: ComponentFixture<TaskConfirmDialogComponent>;
  let store: MockStore;
  const initialState = { modal: { taskId: '123' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskConfirmDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set taskId from store', () => {
    expect(component.taskId).toBe('123');
  });

  it('should dispatch deleteTask and closeDeleteModal on confirmDelete', () => {
    jest.spyOn(store, 'dispatch');
    component.confirmDelete();
    expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ taskId: '123' }));
    expect(store.dispatch).toHaveBeenCalledWith(closeDeleteModal());
  });

  it('should dispatch closeDeleteModal on close', () => {
    jest.spyOn(store, 'dispatch');
    component.close();
    expect(store.dispatch).toHaveBeenCalledWith(closeDeleteModal());
  });
});