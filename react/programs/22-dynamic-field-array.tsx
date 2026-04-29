import {useState} from 'react';

type Skill = {
  id: string;
  name: string;
};

export function DynamicSkillsForm() {
  const [skills, setSkills] = useState<Skill[]>([{id: crypto.randomUUID(), name: ''}]);

  function updateSkill(id: string, name: string) {
    setSkills((items) =>
      items.map((skill) => (skill.id === id ? {...skill, name} : skill)),
    );
  }

  return (
    <form>
      {skills.map((skill) => (
        <input
          key={skill.id}
          value={skill.name}
          onChange={(event) => updateSkill(skill.id, event.target.value)}
          aria-label="Skill"
        />
      ))}
      <button
        type="button"
        onClick={() =>
          setSkills((items) => [...items, {id: crypto.randomUUID(), name: ''}])
        }
      >
        Add skill
      </button>
    </form>
  );
}

