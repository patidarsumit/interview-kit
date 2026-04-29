type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

type User = {
  id: string;
  name: string;
  email: string;
};

type UserWithoutEmail = MyOmit<User, 'email'>;

const user: UserWithoutEmail = {
  id: 'u1',
  name: 'Sumit',
};

console.log(user);

