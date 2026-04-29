import {useEffect, useRef} from 'react';
import type {ReactNode} from 'react';

export function AccessibleModal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <section role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button ref={closeButtonRef} type="button" onClick={onClose}>
        Close
      </button>
      <h2 id="modal-title">Dialog</h2>
      {children}
    </section>
  );
}
