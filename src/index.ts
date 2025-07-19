import readline from 'readline';
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';
import ora from 'ora';
import gradient from 'gradient-string';
import { promisify } from 'util';

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
            chalk.bold.cyan('💬  Devs. Chat. Collaborate.') + '\n\n' + chalk.gray('Type "help" to explore commands.'),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'double',
                borderColor: 'cyan',
            }
        )
    );
    rl.prompt();
}

function showHelp() {
    console.log(chalk.bold.magenta('\nAvailable Commands:\n'));
    console.log(`${chalk.cyan('  hello')}       → Greet the CLI`);
    console.log(`${chalk.cyan('  spin')}        → Show loading spinner`);
    console.log(`${chalk.cyan('  groups')}      → View or join dev groups`);
    console.log(`${chalk.cyan('  chat')}        → Start 1-on-1 chat`);
    console.log(`${chalk.cyan('  help')}        → Show this help`);
    console.log(`${chalk.cyan('  exit')}        → Exit Monkr\n`);
}

async function startCLI() {
    await showTitle();
    rl.prompt();

    rl.on('line', async (line: string) => {
        const command = line.trim().toLowerCase();

        switch (command) {
            case 'hello':
                console.log(chalk.greenBright('\n👋 Welcome to Monkr — the dev-friendly CLI!\n'));
                break;

            case 'help':
                showHelp();
                break;

            case 'spin': {
                const spinner = ora('🌀 Connecting to the dev realm...').start();
                setTimeout(() => {
                    spinner.succeed('✅ Connected!');
                    rl.prompt();
                }, 2000);
                return;
            }

            case 'groups':
                console.log(chalk.blue('\n👥 Explore groups like:'));
                console.log(chalk.yellow('• JavaScript Ninjas'));
                console.log(chalk.yellow('• Indie Hackers Lounge'));
                console.log(chalk.yellow('• AI Dev Builders\n'));
                break;

            case 'chat':
                console.log(chalk.green('\n💬 Start chatting with a dev! (feature coming soon)\n'));
                break;

            case 'exit':
                console.log(chalk.redBright('\n👋 Exiting Monkr. Stay creative!\n'));
                rl.close();
                return;

            default:
                console.log(chalk.redBright(`\n❌ Unknown command: ${command}\nType "help" to see what you can do.\n`));
        }

        rl.prompt();
    });

    rl.on('close', () => {
        console.log(chalk.gray('CLI session ended.'));
        process.exit(0);
    });
}

startCLI();
