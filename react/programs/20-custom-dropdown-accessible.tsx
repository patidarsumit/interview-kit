import {useState} from 'react';

type Option = {
  value: string;
  label: string;
};

export function AccessibleDropdown({options}: {options: Option[]}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]?.value ?? '');

  const selectedLabel =
    options.find((option) => option.value === selectedValue)?.label ?? 'Select';

  return (
    <section>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {selectedLabel}
      </button>
      {open && (
        <ul role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selectedValue}
              onClick={() => {
                setSelectedValue(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

