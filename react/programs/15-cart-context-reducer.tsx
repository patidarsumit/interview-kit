import {createContext, useContext, useMemo, useReducer} from 'react';
import type {ReactNode} from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Action =
  | {type: 'add'; item: CartItem}
  | {type: 'remove'; id: string}
  | {type: 'quantity'; id: string; quantity: number};

function reducer(items: CartItem[], action: Action) {
  switch (action.type) {
    case 'add':
      return [...items, action.item];
    case 'remove':
      return items.filter((item) => item.id !== action.id);
    case 'quantity':
      return items.map((item) =>
        item.id === action.id ? {...item, quantity: action.quantity} : item,
      );
  }
}

const CartContext = createContext<{
  items: CartItem[];
  total: number;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function CartProvider({children}: {children: ReactNode}) {
  const [items, dispatch] = useReducer(reducer, []);

  const value = useMemo(
    () => ({
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      dispatch,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
