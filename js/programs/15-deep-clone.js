function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Map) {
    const clone = new Map();
    seen.set(obj, clone);
    obj.forEach((value, key) => clone.set(deepClone(key, seen), deepClone(value, seen)));
    return clone;
  }
  if (obj instanceof Set) {
    const clone = new Set();
    seen.set(obj, clone);
    obj.forEach(value => clone.add(deepClone(value, seen)));
    return clone;
  }

  const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  seen.set(obj, clone);

  for (const key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}
// Handles arrays, objects, Date, Map, Set, symbol keys, and circular refs.
