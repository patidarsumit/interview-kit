type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type User = {
  id: string;
  name: string;
  email: string;
};

const patch: MyPartial<User> = {
  email: 'sumit@example.com',
};

console.log(patch);

