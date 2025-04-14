import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockLoginResponse = {
    token: 'fake-jwt-token',
    userId: 1,
  };

  beforeEach(() => {
    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true and set isAuthenticated to true on successful login', () => {
      service.login('testuser', 'password').subscribe((result) => {
        expect(result).toBe(true);
        expect(service['isAuthenticated']).toBe(true);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockLoginResponse);
    });

    it('should return false on login failure', () => {
      service.login('testuser', 'wrongpassword').subscribe((result) => {
        expect(result).toBe(false);
        expect(service['isAuthenticated']).toBe(false);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('register', () => {
    it('should call the register endpoint and return the response', () => {
      const mockRegisterResponse = { id: 1, username: 'testuser' };

      service.register('testuser', 'password').subscribe((response) => {
        expect(response).toEqual(mockRegisterResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/register');
      expect(req.request.method).toBe('POST');
      req.flush(mockRegisterResponse);
    });
  });

  describe('logout', () => {
    it('should clear the token and navigate to login', () => {
      
      service.logout();

      expect(service['isAuthenticated']).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isLoggedIn', () => {

    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(),
        },
        writable: true,
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return true if token exists in localStorage', () => {
      window.localStorage.getItem = jest.fn(() => 'fake-jwt-token');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false if token does not exist in localStorage', () => {
      window.localStorage.getItem = jest.fn(() => null);
      expect(service.isLoggedIn()).toBe(false);
    });
  });
});