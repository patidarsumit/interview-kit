type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

type DraftUser = {
  id?: string;
  name?: string;
};

const user: MyRequired<DraftUser> = {
  id: 'u1',
  name: 'Sumit',
};

console.log(user);

