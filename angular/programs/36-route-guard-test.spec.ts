import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {authGuard} from './11-auth-guard-functional';

describe('authGuard', () => {
  it('can be executed in injection context', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            parseUrl: (url: string) => url,
          },
        },
      ],
    });

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as never, {} as never),
    );

    expect(result).toBe(true);
  });
});

