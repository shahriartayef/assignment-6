1)The difference between var, let, and const are:
var: Function-scoped, can be re-declared and updated.
let: Block-scoped, can be updated but not re-declared in the same scope.
const: Block-scoped, cannot be updated or re-declared (for constants).
2)map(): Returns a new array with modified elements.
forEach(): Executes a function on each element, no return value.
filter(): Returns a new array with elements that pass a condition.

3)Arrow functions in ES6 are:
Shorter syntax for functions: (params) => expression.
Does not have its own this.

4)Destructuring assignment:
Extracts values from arrays/objects into variables:
const [a, b] = [1, 2];
const {x, y} = {x: 10, y: 20};

5)Template literals:
Use backticks ` and ${} for variables:
const name = "John";
console.log(Hello, ${name});