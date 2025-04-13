import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TaskFilterComponent } from './task-filter.component';
import { setFilter } from '../../store/actions/filter.action';

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;
  let store: MockStore;
  const initialState = { filter: { filter: 'Todas' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the current filter from the store', (done) => {
    component.currentFilter$.subscribe((filter) => {
      expect(filter).toBe('Todas');
      done();
    });
  });

  it('should dispatch setFilter action when setFilter is called', () => {
    jest.spyOn(store, 'dispatch');
    component.setFilter('Ativas');
    expect(store.dispatch).toHaveBeenCalledWith(setFilter({ filter: 'Ativas' }));
  });

  it('should dispatch setFilter with "Todas" when setFilter is called with "Todas"', () => {
    jest.spyOn(store, 'dispatch');
    component.setFilter('Todas');
    expect(store.dispatch).toHaveBeenCalledWith(setFilter({ filter: 'Todas' }));
  });
  
  it('should dispatch setFilter with "Concluídas" when setFilter is called with "Concluídas"', () => {
    jest.spyOn(store, 'dispatch');
    component.setFilter('Concluídas');
    expect(store.dispatch).toHaveBeenCalledWith(setFilter({ filter: 'Concluídas' }));
  });
});