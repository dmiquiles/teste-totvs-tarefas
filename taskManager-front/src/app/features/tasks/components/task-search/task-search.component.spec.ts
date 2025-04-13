import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskSearchComponent } from './task-search.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { setSearchTerm } from '../../store/actions/search.action';
import { FormsModule } from '@angular/forms';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setSearchTerm with the search term when term length is >= 3', () => {
    spyOn(store, 'dispatch');
    const searchTerm = 'task';
    component.searchTasks(searchTerm);
    expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm({ term: searchTerm }));
  });

  it('should dispatch setSearchTerm with an empty string when term length is < 3', () => {
    spyOn(store, 'dispatch');
    const searchTerm = 'ta';
    component.searchTasks(searchTerm);
    expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm({ term: '' }));
  });
});