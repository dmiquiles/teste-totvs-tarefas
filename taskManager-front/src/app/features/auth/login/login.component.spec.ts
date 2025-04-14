import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      login: jest.fn().mockReturnValue(of(true)),
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
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should call AuthService.login and navigate on successful login', () => {
    const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(of(true));
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.loginForm.setValue({ username: 'testuser', password: 'password' });
    component.login();

    expect(loginSpy).toHaveBeenCalledWith('testuser', 'password');
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(component.loginForm.errors).toBeNull();
  });

  it('should set form error on failed login', () => {
    jest.spyOn(authService, 'login').mockReturnValue(of(false));

    component.loginForm.setValue({ username: 'testuser', password: 'wrongpassword' });
    component.login();

    expect(component.loginForm.errors).toEqual({ invalidLogin: true });
  });

  it('should set form error on login error', () => {
    jest.spyOn(authService, 'login').mockReturnValue(throwError(() => new Error('Login failed')));

    component.loginForm.setValue({ username: 'testuser', password: 'password' });
    component.login();

    expect(component.loginForm.errors).toEqual({ invalidLogin: true });
  });

  it('should not call AuthService.login if the form is invalid', () => {
    const loginSpy = jest.spyOn(authService, 'login');

    component.loginForm.setValue({ username: '', password: '' });
    component.login();

    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('should navigate to register page', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.goToRegister();

    expect(navigateSpy).toHaveBeenCalledWith(['/register']);
  });
});