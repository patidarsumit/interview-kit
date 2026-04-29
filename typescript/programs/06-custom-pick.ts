type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};

type User = {
  id: string;
  name: string;
  email: string;
};

type PublicUser = MyPick<User, 'id' | 'name'>;

const publicUser: PublicUser = {
  id: 'u1',
  name: 'Sumit',
};

console.log(publicUser);

