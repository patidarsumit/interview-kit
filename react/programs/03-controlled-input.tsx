import {useState} from 'react';

export function ControlledEmailInput() {
  const [email, setEmail] = useState('');

  return (
    <label>
      Email
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </label>
  );
}

