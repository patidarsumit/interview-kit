import {Component, computed, signal} from '@angular/core';

type Product = {
  id: string;
  name: string;
  price: number;
};

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    <input
      type="search"
      aria-label="Search products"
      [value]="query()"
      (input)="query.set($any($event.target).value)"
    >

    @for (product of filteredProducts(); track product.id) {
      <article>
        <h2>{{ product.name }}</h2>
        <p>{{ product.price }}</p>
      </article>
    } @empty {
      <p>No products found.</p>
    }
  `,
})
export class ProductListComponent {
  query = signal('');

  products = signal<Product[]>([
    {id: 'p1', name: 'Keyboard', price: 100},
    {id: 'p2', name: 'Mouse', price: 50},
  ]);

  filteredProducts = computed(() => {
    const query = this.query().trim().toLowerCase();

    return this.products().filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  });
}

