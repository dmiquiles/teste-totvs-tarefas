import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TaskHeaderComponent } from './task-header.component';
import { toggleDarkMode } from '../../store/actions/theme.action';
import { openModal, closeModal } from '../../store/actions/modal.action';
import { MatDialog } from '@angular/material/dialog';

describe('TaskHeaderComponent', () => {
  let component: TaskHeaderComponent;
  let fixture: ComponentFixture<TaskHeaderComponent>;
  let store: MockStore;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  const initialState = { theme: { darkMode: false } };

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'close']);

    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskHeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select darkMode from the store', (done) => {
    component.darkMode$.subscribe((darkMode) => {
      expect(darkMode).toBeFalse();
      done();
    });
  });

  it('should dispatch toggleDarkMode when toggleDarkMode is called', () => {
    spyOn(store, 'dispatch');
    component.toggleDarkMode();
    expect(store.dispatch).toHaveBeenCalledWith(toggleDarkMode());
  });

  it('should dispatch openModal when openModal is called', () => {
    spyOn(store, 'dispatch');
    component.openModal();
    expect(store.dispatch).toHaveBeenCalledWith(openModal({ task: null }));
  });

  it('should dispatch closeModal when closeModal is called', () => {
    spyOn(store, 'dispatch');
    component.closeModal();
    expect(store.dispatch).toHaveBeenCalledWith(closeModal());
  });
});