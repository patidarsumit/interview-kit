import {useEffect, useRef} from 'react';

export function LoadMoreSentinel({onLoadMore}: {onLoadMore: () => void}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onLoadMore();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return <div ref={ref} aria-hidden="true" />;
}

