import { TestBed } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { selectDarkMode } from './features/tasks/store/selectors/theme.selectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockStore: MockStore;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: Renderer2,
          useValue: {
            addClass: jest.fn(),
            removeClass: jest.fn(),
          },
        },
      ],
    });

    mockStore = TestBed.inject(MockStore);
    mockRenderer = TestBed.inject(Renderer2);
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to selectDarkMode on initialization', () => {
    const selectSpy = jest.spyOn(mockStore, 'select');
    TestBed.createComponent(AppComponent);

    expect(selectSpy).toHaveBeenCalledWith(selectDarkMode);
  });
});