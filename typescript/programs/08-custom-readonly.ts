type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type User = {
  id: string;
  name: string;
};

const user: MyReadonly<User> = {
  id: 'u1',
  name: 'Sumit',
};

console.log(user);

