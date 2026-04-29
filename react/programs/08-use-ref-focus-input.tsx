import {useRef} from 'react';

export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} aria-label="Search" />
      <button type="button" onClick={() => inputRef.current?.focus()}>
        Focus
      </button>
    </>
  );
}

