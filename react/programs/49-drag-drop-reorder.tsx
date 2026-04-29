import {useState} from 'react';

function move<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function ReorderSkills() {
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Testing']);

  return (
    <ul>
      {skills.map((skill, index) => (
        <li key={skill}>
          {skill}
          <button
            type="button"
            disabled={index === 0}
            onClick={() => setSkills((items) => move(items, index, index - 1))}
          >
            Up
          </button>
        </li>
      ))}
    </ul>
  );
}

