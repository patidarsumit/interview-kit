type UserCardProps = {
  name: string;
  role: string;
};

export function UserCard({name, role}: UserCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}

