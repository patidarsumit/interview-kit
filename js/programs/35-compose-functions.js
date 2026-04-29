function compose(...functions) {
  return function (initialValue) {
    return functions.reduceRight((value, fn) => fn(value), initialValue);
  };
}

const double = x => x * 2;
const square = x => x * x;
const subtractOne = x => x - 1;

const calculate = compose(subtractOne, square, double);
console.log(calculate(3)); // 35: subtractOne(square(double(3)))
