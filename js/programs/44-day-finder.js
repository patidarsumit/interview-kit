function getDay(day, k) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const index = days.indexOf(day);

  if (index === -1) return null;

  return days[(index + k) % days.length];
}

console.log(getDay("Tue", 2)); // Thu
console.log(getDay("Sat", 3)); // Tue
