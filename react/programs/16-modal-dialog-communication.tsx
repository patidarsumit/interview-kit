type ConfirmDialogProps = {
  title: string;
  message: string;
  onClose: (confirmed: boolean) => void;
};

export function ConfirmDialog({title, message, onClose}: ConfirmDialogProps) {
  return (
    <section role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <h2 id="confirm-title">{title}</h2>
      <p>{message}</p>
      <button type="button" onClick={() => onClose(false)}>
        Cancel
      </button>
      <button type="button" onClick={() => onClose(true)}>
        Confirm
      </button>
    </section>
  );
}

