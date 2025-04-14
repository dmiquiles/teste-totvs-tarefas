import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      register: jest.fn().mockReturnValue(of({"id":1,"username":"fulano"})),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    const activatedRouteMock = {
      snapshot: {
        queryParams: {},
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the register form', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.get('username')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });

  it('should call AuthService.register and navigate to login on successful registration', () => {
    const registerSpy = jest.spyOn(authService, 'register').mockReturnValue(of({"id":1,"username":"fulano"}));
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.registerForm.setValue({ username: 'testuser', password: 'password' });
    component.register();

    expect(registerSpy).toHaveBeenCalledWith('testuser', 'password');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(component.registerForm.value).toEqual({ username: null, password: null });
  });

  it('should not call AuthService.register if the form is invalid', () => {
    const registerSpy = jest.spyOn(authService, 'register');

    component.registerForm.setValue({ username: '', password: '' });
    component.register();

    expect(registerSpy).not.toHaveBeenCalled();
  });
});