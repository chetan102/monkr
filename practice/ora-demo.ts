import ora from 'ora';

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
  spinner.color = 'yellow';
  spinner.text = 'Still loading...';
}, 1000);

setTimeout(() => {
  spinner.succeed('Done!');
}, 3000);
