import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isLoggedIn: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow activation if the user is logged in', () => {
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(true);

    const result = authGuard.canActivate();

    expect(result).toBe(true);
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and redirect to login if the user is not logged in', () => {
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);

    const result = authGuard.canActivate();

    expect(result).toBe(false);
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});