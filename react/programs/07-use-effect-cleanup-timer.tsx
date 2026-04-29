import {useEffect, useState} from 'react';

export function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return <time>{time.toLocaleTimeString()}</time>;
}

