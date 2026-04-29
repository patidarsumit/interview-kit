type Role = 'admin' | 'manager' | 'user';

type MenuItem = {
  label: string;
  path: string;
  roles: Role[];
};

const menuItems: MenuItem[] = [
  {label: 'Dashboard', path: '/dashboard', roles: ['admin', 'manager', 'user']},
  {label: 'Users', path: '/users', roles: ['admin']},
  {label: 'Reports', path: '/reports', roles: ['admin', 'manager']},
];

export function RoleBasedMenu({roles}: {roles: Role[]}) {
  const roleSet = new Set(roles);
  const visibleItems = menuItems.filter((item) =>
    item.roles.some((role) => roleSet.has(role)),
  );

  return (
    <nav aria-label="Main navigation">
      {visibleItems.map((item) => (
        <a key={item.path} href={item.path}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

