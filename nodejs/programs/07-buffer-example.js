const text = 'hello';
const buffer = Buffer.from(text, 'utf8');

console.log(buffer);
console.log(buffer.toString('hex'));
console.log(buffer.toString('base64'));

