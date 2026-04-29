'use client';

import {useState} from 'react';

export function AddToCartButton() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((value) => value + 1)}>
      Add to cart ({count})
    </button>
  );
}

