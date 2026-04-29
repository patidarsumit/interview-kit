import {computed, signal} from '@angular/core';

type Role = 'admin' | 'manager' | 'user';

type MenuItem = {
  label: string;
  path: string;
  roles: Role[];
};

const currentRoles = signal<Role[]>(['user']);

const menuItems: MenuItem[] = [
  {label: 'Dashboard', path: '/dashboard', roles: ['admin', 'manager', 'user']},
  {label: 'Users', path: '/users', roles: ['admin']},
  {label: 'Reports', path: '/reports', roles: ['admin', 'manager']},
];

export const visibleMenuItems = computed(() => {
  const roles = new Set(currentRoles());
  return menuItems.filter((item) => item.roles.some((role) => roles.has(role)));
});

export function setRoles(roles: Role[]) {
  currentRoles.set(roles);
}

