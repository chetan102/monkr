import readline from 'readline';
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';
import ora from 'ora';
import { promisify } from 'util';

const figletAsync = promisify(figlet.text);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.cyan('> '),
});

async function showTitle() {
  const title = await figletAsync('My CLI');
  console.log(chalk.green(title));
  console.log(boxen(
    chalk.yellow('Type "help" to see available commands'),
    { padding: 1, margin: 1, borderStyle: 'round' }
  ));
}

async function startCLI() {
  console.clear();
  await showTitle();
  rl.prompt();

  rl.on('line', async (line: string) => {
    const command = line.trim().toLowerCase();

    switch (command) {
      case 'hello':
        console.log(chalk.blue('👋 Hello, welcome to the CLI!'));
        break;

      case 'help':
        console.log(chalk.magenta('Available commands:'));
        console.log(chalk.cyan('  hello   ') + '- Greet the CLI');
        console.log(chalk.cyan('  spin    ') + '- Show loading spinner');
        console.log(chalk.cyan('  exit    ') + '- Exit the CLI');
        break;

      case 'spin': {
        const spinner = ora('Processing...').start();
        setTimeout(() => {
          spinner.succeed('Done!');
          rl.prompt();
        }, 2000);
        return; // Skip rl.prompt now
      }

      case 'exit':
        console.log(chalk.red('👋 Exiting...'));
        rl.close();
        return;

      default:
        console.log(chalk.red(`Unknown command: ${command}`));
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log(chalk.gray('CLI closed.'));
    process.exit(0);
  });
}

startCLI();
