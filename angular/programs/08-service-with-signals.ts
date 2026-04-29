import {Injectable, computed, signal} from '@angular/core';

type CartItem = {
  id: string;
  name: string;
  price: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0),
  );

  addItem(item: CartItem) {
    this._items.update((items) => [...items, item]);
  }

  removeItem(id: string) {
    this._items.update((items) => items.filter((item) => item.id !== id));
  }
}

