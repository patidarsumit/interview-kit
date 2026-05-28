function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const value = item[key];

    if (!acc[value]) {
      acc[value] = [];
    }

    acc[value].push(item);
    return acc;
  }, {});
}

const users = [
  { name: "John", role: "admin" },
  { name: "Sam", role: "user" },
  { name: "Mike", role: "admin" },
];

console.log(groupBy(users, "role"));
// {
//   admin: [{ name: "John", role: "admin" }, { name: "Mike", role: "admin" }],
//   user: [{ name: "Sam", role: "user" }]
// }
