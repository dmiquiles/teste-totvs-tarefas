import { setSearchTerm } from "../../store/actions/search.action";
import { TaskSearchComponent } from "./task-search.component";

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let store: any;

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
    };
    component = new TaskSearchComponent(store);
  });

  it('should dispatch setSearchTerm with the term when term length is 3 or more', () => {
    const term = 'test';
    component.searchTasks(term);
    expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm({ term }));
  });

  it('should dispatch setSearchTerm with an empty string when term length is less than 3', () => {
    const term = 'te';
    component.searchTasks(term);
    expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm({ term: '' }));
  });
});