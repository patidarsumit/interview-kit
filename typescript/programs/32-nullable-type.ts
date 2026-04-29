type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type User = {
  id: string;
  name: string;
};

const nullableUser: Nullable<User> = {
  id: 'u1',
  name: null,
};

console.log(nullableUser);

