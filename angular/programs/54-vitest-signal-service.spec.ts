import {TestBed} from '@angular/core/testing';
import {describe, expect, it} from 'vitest';
import {CartStateService} from './08-service-with-signals';

describe('CartStateService with signals', () => {
  it('updates derived signal state synchronously', () => {
    const store = TestBed.inject(CartStateService);

    expect(store.count()).toBe(0);
    expect(store.total()).toBe(0);

    store.addItem({id: 'p1', name: 'Keyboard', price: 2500});

    expect(store.count()).toBe(1);
    expect(store.total()).toBe(2500);
  });
});
