import readline from 'readline';
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';
import ora from 'ora';
import gradient from 'gradient-string';
import { promisify } from 'util';
import inquirer from 'inquirer';

async function figletAsync(text: string, options: figlet.Options): Promise<string> {
    return new Promise((resolve, reject) => {
        figlet.text(text, options, (err, data) => {
            if (err || !data) reject(err);
            else resolve(data);
        });
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.cyan('monkr > '),
});

async function showTitle() {
    const title = await figletAsync("Monkr", {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true,
    });

    console.clear();
    console.log(gradient.rainbow.multiline(title));
    console.log(
        boxen(
            chalk.bold('💬 Monkr: Where Devs Talk & Collaborate\n') +
            chalk.gray('Find groups, chat 1-on-1, build ideas together.'),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan',
            }
        )
    );
    rl.prompt();
}


async function mainMenu() {
    const choices = [
        { name: '👥 Explore Dev Groups', value: 'groups' },
        { name: '💬 Start 1-on-1 Chat', value: 'chat' },
        { name: '❓ What is Monkr?', value: 'help' },
        { name: '🚪 Exit', value: 'exit' },
    ];

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: chalk.cyan('Select an option:'),
            choices,
        },
    ]);

    switch (action) {
        case 'groups':
            await showGroups();
            break;
        case 'chat':
            await showChat();
            break;
        case 'help':
            showHelp();
            break;
        case 'exit':
            console.log(chalk.red('\n👋 Goodbye! Keep building, stay curious.\n'));
            process.exit(0);
    }

    await mainMenu(); // Loop back to menu
}

async function showGroups() {
    console.log('\n' + chalk.bold.magenta('👥 Top Dev Groups:\n'));
    console.log(chalk.white('• JavaScript Ninjas'));
    console.log(chalk.white('• Indie Hackers Lounge'));
    console.log(chalk.white('• AI Dev Builders'));
    console.log(chalk.white('• Startup Founders Hub\n'));
}

async function showChat() {
    console.log('\n' + chalk.greenBright('💬 1-on-1 Chat feature coming soon!\n'));
}

function showHelp() {
    console.log('\n' + chalk.yellow.bold('📖 What is Monkr?\n'));
    console.log(
        chalk.gray(
            'Monkr is your minimalist dev hangout inside the terminal.\n' +
            'Find people building similar things, chat, share, and start collaborating.\n' +
            'Perfect for indie makers, startup hackers, or AI tinkerers.'
        )
    );
}

(async () => {
    await showTitle();
    await mainMenu();
})();