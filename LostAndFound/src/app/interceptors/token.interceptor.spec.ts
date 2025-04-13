import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { tokenInterceptor } from './token.interceptor';
import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('tokenInterceptor', () => {
  let mockAuthService: Partial<AuthService>;

  beforeEach(() => {
    mockAuthService = {
      getToken: () => 'test-token'
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
  });

  it('should add Authorization header if token exists', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBe('Token test-token');
      return {} as any;
    };

    TestBed.runInInjectionContext(() => {
      tokenInterceptor(req, next);
    });
  });

  it('should not add Authorization header if no token', () => {
    mockAuthService.getToken = () => null;

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.has('Authorization')).toBe(false);
      return {} as any;
    };

    TestBed.runInInjectionContext(() => {
      tokenInterceptor(req, next);
    });
  });
});
