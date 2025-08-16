#!/usr/bin/env node
import boxen from 'boxen';
import chalk from 'chalk';
import ora from 'ora';
import cfonts from 'cfonts';
import gradient from 'gradient-string';
import { core } from '@monkr/core';

async function run() {
    core();
    console.clear();
    cfonts.say('MONKR', { font: 'block', colors: ['cyan', 'magenta'], align: 'center' });

    console.log(
        boxen(
            gradient('cyan', 'magenta')('The CLI Discord for Developers') +
            '\n' +
            chalk.gray('by Monkr Team'),
            { padding: 1, borderColor: 'cyan', align: 'center' }
        )
    );

    const spinner = ora('Connecting to Monkr...').start();
    await new Promise((res) => setTimeout(res, 800));
    spinner.succeed('Connected!');
    console.log(chalk.green('🚀 Ready to chat!'));
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
