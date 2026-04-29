function flattenObject(obj, prefix = '', result = {}) {
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

const user = {
  name: 'Sumit',
  address: {
    city: 'Pune',
    pin: 411001,
  },
};

console.log(flattenObject(user)); // { name: 'Sumit', 'address.city': 'Pune', 'address.pin': 411001 }
