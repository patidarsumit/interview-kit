function setProperty<T, K extends keyof T>(
  object: T,
  key: K,
  value: T[K],
): T {
  return {
    ...object,
    [key]: value,
  };
}

const user = {
  id: 'u1',
  name: 'Sumit',
  age: 30,
};

const updatedUser = setProperty(user, 'age', 31);

console.log(updatedUser);

