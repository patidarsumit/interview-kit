import {computed, signal} from '@angular/core';

type SortDirection = 'asc' | 'desc';

type UserRow = {
  id: string;
  name: string;
  role: string;
};

const rows = signal<UserRow[]>([]);
const filter = signal('');
const pageIndex = signal(0);
const pageSize = signal(10);
const sort = signal<{key: keyof UserRow; direction: SortDirection}>({
  key: 'name',
  direction: 'asc',
});

export const filteredRows = computed(() => {
  const query = filter().toLowerCase();
  return rows().filter((row) => row.name.toLowerCase().includes(query));
});

export const sortedRows = computed(() => {
  const currentSort = sort();

  return [...filteredRows()].sort((a, b) => {
    const left = String(a[currentSort.key]);
    const right = String(b[currentSort.key]);
    const result = left.localeCompare(right);

    return currentSort.direction === 'asc' ? result : -result;
  });
});

export const pagedRows = computed(() => {
  const start = pageIndex() * pageSize();
  return sortedRows().slice(start, start + pageSize());
});

export function updateFilter(value: string) {
  filter.set(value);
  pageIndex.set(0);
}

export function updateSort(key: keyof UserRow) {
  sort.update((current) => ({
    key,
    direction:
      current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
  }));
}

