type PromiseValue<T> = T extends Promise<infer Value> ? Value : T;

type User = {
  id: string;
  name: string;
};

type UserPromiseValue = PromiseValue<Promise<User>>;

const user: UserPromiseValue = {
  id: 'u1',
  name: 'Sumit',
};

console.log(user);

