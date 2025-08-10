#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import ora from 'ora';

function showBanner() {
  const text = figlet.textSync('Monkr CLI', { font: 'Standard' });
  console.log(
    boxen(gradient.pastel(text), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
    })
  );
  console.log(chalk.green('Welcome to Monkr! 🌟'));
}

function showHelp() {
  console.log(chalk.bold(`Usage: monkr <command> [options]\n`));
  console.log(chalk.cyan('Commands:'));
  console.log(chalk.bold('  groups'), '      List all chat groups');
  console.log(chalk.bold('  random'), '      Connect 1-on-1 with a random developer');
  console.log(chalk.bold('  join <group>'), 'Join a group chat');
  console.log('');
  console.log(chalk.bold('Examples:'));
  console.log('  monkr groups');
  console.log('  monkr random');
  console.log('  monkr join SAAS');
  console.log('');
}

async function listGroups() {
  const spinner = ora('Fetching groups...').start();
  await new Promise(r => setTimeout(r, 700));
  spinner.succeed('Groups loaded');
  const groups = ['SAAS', 'Javascript Mastery', 'DevOps'];
  console.log(chalk.cyanBright('Groups:'));
  for (const g of groups) {
    console.log('- ' + chalk.bold(g));
  }
}

async function randomConnect() {
  const spinner = ora('Finding a random developer...').start();
  await new Promise(r => setTimeout(r, 1200));
  spinner.succeed(chalk.magenta('Connected! Start chatting 🚀'));
}

async function joinGroup(group: string) {
  if (!group) {
    console.log(chalk.red('Please specify a group name: monkr join <group>'));
    return;
  }
  const spinner = ora(`Joining group: ${group}...`).start();
  await new Promise(r => setTimeout(r, 700));
  spinner.succeed(chalk.green(`Joined group: ${chalk.bold(group)}`));
}

async function main() {
  showBanner();

  const args = process.argv.slice(2); // skip node and script path

  const cmd = args[0];
  switch (cmd) {
    case 'groups':
      await listGroups();
      break;
    case 'random':
      await randomConnect();
      break;
    case 'join':
      await joinGroup(args[1]);
      break;
    case 'help':
    case undefined:
      showHelp();
      break;
    default:
      console.log(chalk.red('Unknown command: '), chalk.yellow(cmd));
      showHelp();
      process.exitCode = 1;
  }
}

// Run it
main().catch(err => {
  console.error(chalk.red('Unexpected error:'), err);
  process.exit(1);
});

