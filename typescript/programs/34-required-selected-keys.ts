type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type DraftUser = {
  id: string;
  email?: string;
};

const user: RequiredKeys<DraftUser, 'email'> = {
  id: 'u1',
  email: 'sumit@example.com',
};

console.log(user);

