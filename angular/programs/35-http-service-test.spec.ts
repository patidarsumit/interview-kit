import {provideHttpClient} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {UsersApiService} from './10-http-service-crud';

describe('UsersApiService', () => {
  it('loads users', () => {
    TestBed.configureTestingModule({
      providers: [
        UsersApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    const service = TestBed.inject(UsersApiService);
    const http = TestBed.inject(HttpTestingController);

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(1);
    });

    const request = http.expectOne('/api/users');
    expect(request.request.method).toBe('GET');
    request.flush([{id: 'u1', name: 'Sumit', email: 'sumit@example.com'}]);

    http.verify();
  });
});

