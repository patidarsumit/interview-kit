import {memo, useCallback, useState} from 'react';

const SaveButton = memo(function SaveButton({onSave}: {onSave: () => void}) {
  return (
    <button type="button" onClick={onSave}>
      Save
    </button>
  );
});

export function SettingsPanel() {
  const [name, setName] = useState('');

  const save = useCallback(() => {
    console.log('save', name);
  }, [name]);

  return (
    <>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <SaveButton onSave={save} />
    </>
  );
}

