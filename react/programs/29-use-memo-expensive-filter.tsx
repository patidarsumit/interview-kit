import {useMemo, useState} from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

export function ProductSearch({products}: {products: Product[]}) {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [products, query]);

  return (
    <section>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <p>Results: {filteredProducts.length}</p>
    </section>
  );
}

