import {TestBed} from '@angular/core/testing';
import {CartStateService} from './08-service-with-signals';

describe('CartStateService', () => {
  it('calculates total', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(CartStateService);

    service.addItem({id: 'p1', name: 'Keyboard', price: 100});
    service.addItem({id: 'p2', name: 'Mouse', price: 50});

    expect(service.total()).toBe(150);
  });
});

