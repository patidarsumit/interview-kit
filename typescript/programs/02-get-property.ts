function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = {
  id: 'u1',
  name: 'Sumit',
  age: 30,
};

const nameValue = getProperty(user, 'name');
const ageValue = getProperty(user, 'age');

console.log(nameValue, ageValue);

