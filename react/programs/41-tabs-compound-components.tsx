import {createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';

const TabsContext = createContext<{
  active: string;
  setActive: (id: string) => void;
} | null>(null);

export function Tabs({children}: {children: ReactNode}) {
  const [active, setActive] = useState('first');

  return (
    <TabsContext.Provider value={{active, setActive}}>
      {children}
    </TabsContext.Provider>
  );
}

export function Tab({id, children}: {id: string; children: ReactNode}) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tab must be used inside Tabs');
  }

  return (
    <button type="button" onClick={() => context.setActive(id)}>
      {children}
    </button>
  );
}

export function TabPanel({id, children}: {id: string; children: ReactNode}) {
  const context = useContext(TabsContext);

  if (!context || context.active !== id) {
    return null;
  }

  return <section>{children}</section>;
}
