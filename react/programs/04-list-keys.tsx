type User = {
  id: string;
  name: string;
};

export function UserList({users}: {users: User[]}) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

