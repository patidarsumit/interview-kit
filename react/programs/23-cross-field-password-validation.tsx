import {useState} from 'react';

export function PasswordValidationForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <form>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-label="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        aria-label="Confirm password"
        aria-invalid={mismatch}
      />
      {mismatch && <p role="alert">Passwords do not match.</p>}
    </form>
  );
}

