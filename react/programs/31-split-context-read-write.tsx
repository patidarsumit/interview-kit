import {createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';

const CountValueContext = createContext<number | null>(null);
const CountActionsContext = createContext<(() => void) | null>(null);

export function CountProvider({children}: {children: ReactNode}) {
  const [count, setCount] = useState(0);

  return (
    <CountValueContext.Provider value={count}>
      <CountActionsContext.Provider value={() => setCount((value) => value + 1)}>
        {children}
      </CountActionsContext.Provider>
    </CountValueContext.Provider>
  );
}

export function useCountValue() {
  return useContext(CountValueContext);
}

export function useIncrementCount() {
  return useContext(CountActionsContext);
}
