type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type User = {
  id: string;
  name: string;
  email: string;
};

const user: OptionalKeys<User, 'email'> = {
  id: 'u1',
  name: 'Sumit',
};

console.log(user);

