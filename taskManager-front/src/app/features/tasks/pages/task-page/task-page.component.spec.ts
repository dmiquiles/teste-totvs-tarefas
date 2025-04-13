import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Task } from "../../models/task.model";
import { loadTasks } from "../../store/actions/task.action";
import { selectIsDeleteModalOpen, selectModalOpen } from "../../store/selectors/modal.selectors";
import { selectAllTasks } from "../../store/selectors/task.selectors";
import { TaskPageComponent } from "./task-page.component";

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let store: Store;

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(new Observable())
    } as unknown as Store;

    component = new TaskPageComponent(store);
  });

  it('should dispatch loadTasks on initialization', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
  });

  it('should select tasks$ observable on initialization', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(selectAllTasks);
  });

  it('should select isDeleteModalOpen$ observable on initialization', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(selectIsDeleteModalOpen);
  });

  it('should select isModalOpen$ observable on initialization', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(selectModalOpen);
  });

  it('should toggle task completion status', () => {
    const task: Task = { id: 1, title: 'Test Task', completed: false , date: '2023-10-01', priority: 'LOW' };
    component.toggleComplete(task);
    expect(task.completed).toBe(true);
    component.toggleComplete(task);
    expect(task.completed).toBe(false);
  });
});