// //prompts
// fruit = prompt('what is a fruit?');
// console.log(fruit);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is a fruit? ', (fruit) => {
  console.log(`You entered: ${fruit}`);
  rl.close();
});
