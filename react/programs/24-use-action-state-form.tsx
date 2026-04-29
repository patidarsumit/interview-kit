import {useActionState} from 'react';

type FormState = {
  message: string;
};

async function submitUser(previousState: FormState, formData: FormData) {
  const email = String(formData.get('email') ?? '');

  if (!email.includes('@')) {
    return {message: 'Enter a valid email'};
  }

  return {message: 'Saved'};
}

export function ActionStateForm() {
  const [state, formAction, isPending] = useActionState(submitUser, {
    message: '',
  });

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <button type="submit" disabled={isPending}>
        Save
      </button>
      {state.message && <p role="status">{state.message}</p>}
    </form>
  );
}

