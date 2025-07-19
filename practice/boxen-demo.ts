import boxen from 'boxen';

const boxed = boxen('Hello CLI Dev!', {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'green',
});

console.log(boxed);
