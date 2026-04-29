import {useMemo, useState} from 'react';
import type {ReactNode} from 'react';

type VirtualListProps<T> = {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T) => ReactNode;
};

export function VirtualList<T>({
  items,
  itemHeight,
  height,
  renderItem,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const start = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight) + 2;

  const visibleItems = useMemo(
    () => items.slice(start, start + visibleCount),
    [items, start, visibleCount],
  );

  return (
    <div
      style={{height, overflow: 'auto'}}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div style={{height: items.length * itemHeight, position: 'relative'}}>
        <div style={{transform: `translateY(${start * itemHeight}px)`}}>
          {visibleItems.map(renderItem)}
        </div>
      </div>
    </div>
  );
}
