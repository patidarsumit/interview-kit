type Product = {
  id: string;
  name: string;
};

async function getProducts(): Promise<Product[]> {
  return [{id: 'p1', name: 'Keyboard'}];
}

export default async function ProductsServerComponent() {
  const products = await getProducts();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

