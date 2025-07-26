#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';
import ora from 'ora';
// CLI flag parsing
const argv = yargs(hideBin(process.argv))
    .option('name', {
    alias: 'n',
    type: 'string',
    description: 'Your Monkr username',
})
    .option('match', {
    alias: 'm',
    type: 'boolean',
    description: 'Start 1-on-1 match immediately',
})
    .option('group', {
    alias: 'g',
    type: 'boolean',
    description: 'Join group chat',
})
    .help()
    .parseSync(); // 
// Pretty header
console.log(chalk.cyan(boxen(figlet.textSync('Monkr', { horizontalLayout: 'fitted' }), {
    padding: 1,
    margin: 1,
    borderColor: 'green',
    borderStyle: 'round',
})));
// Utility prompt
const prompt = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: '👤 Choose a username:',
            when: () => !argv.name,
        },
        {
            type: 'list',
            name: 'mode',
            message: '🚀 Choose your mode:',
            choices: ['1-on-1 Match', 'Group Chat', 'Exit'],
            when: () => !argv.match && !argv.group,
        },
    ]);
    return {
        username: argv.name || answers.username,
        mode: argv.match ? '1-on-1 Match' : argv.group ? 'Group Chat' : answers.mode,
    };
};
const run = async () => {
    const { username, mode } = await prompt();
    console.log(chalk.green(`✅ Welcome, ${username}!`));
    const spinner = ora('Connecting...').start();
    setTimeout(() => {
        spinner.succeed();
        if (mode === '1-on-1 Match') {
            console.log(chalk.magenta(`🎯 Matched with a random dev. Say hi!`));
        }
        else if (mode === 'Group Chat') {
            console.log(chalk.blue(`🧑‍💻 Joined the global group chat.`));
        }
        else {
            console.log(chalk.gray(`👋 Bye, ${username}! See you again.`));
        }
    }, 1200);
};
run();
