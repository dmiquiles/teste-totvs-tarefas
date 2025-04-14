import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorModalComponent } from './error-modal.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { closeErrorModal } from '../../../core/error/error/store/actions/error.action';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;
  let store: Store;

  beforeEach(async () => {
    const storeMock = {
      select: jest.fn(),
      dispatch: jest.fn(),
    };

    await TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    jest.spyOn(store, 'select').mockImplementation((selector:any) => {
      if (selector.toString().includes('showModal')) {
        return of(true);
      }
      if (selector.toString().includes('errorMessage')) {
        return of('Erro simulado');
      }
      return of(null);
    });

    component.showModal$ = of(true);
    component.errorMessage$ = of('Erro simulado');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the modal when showModal$ is true', () => {
    component.showModal$.subscribe((showModal) => {
      expect(showModal).toBe(true);
    });
  });

  it('should display the error message from errorMessage$', () => {
    component.errorMessage$.subscribe((errorMessage) => {
      expect(errorMessage).toBe('Erro simulado');
    });
  });

  it('should dispatch closeErrorModal action when close is called', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.close();

    expect(dispatchSpy).toHaveBeenCalledWith(closeErrorModal());
  });
});