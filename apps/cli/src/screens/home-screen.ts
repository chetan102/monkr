import cfonts from 'cfonts';
import gradient from 'gradient-string';
import chalk from 'chalk';
import { select } from '@inquirer/prompts';
import { IScreen } from '../types/screen/screen';
import { IAppContext } from '../context/context';
import { LogoService } from '../components/logo/logo';

export default class HomeScreen implements IScreen {
  private destroyed = false;

  constructor(private ctx: IAppContext, private params?: any) {}

  async render() {
    this.destroyed = false;

    // // Print the logo using LogoService
    // LogoService.getLogo();

    // // Gradient header & refined spacing
    // console.log('');
    // console.log(
    //   gradient(['#6b46c1', '#3182ce'])('                  Monkr CLI Dashboard')
    // );
    // console.log('');
    // console.log(
    //   chalk.hex('#6b46c1').bold('Welcome to ') +
    //   chalk.hex('#3182ce').bold('Monkr!')
    // );
    // console.log(chalk.gray('─'.repeat(45)));
    // console.log();
    // console.log(chalk.gray('Use arrow keys to navigate and press Enter to select.\n'));

    // Cleanly spaced menu choices with aligned emoji and labels
    const choices = [
      '🧑‍💻  View Dev Groups',
      '👥   View Group Members',
      '💬  Join Group Chat',
      '📨  Start 1-on-1 Chat',
      '❌  Exit',
    ];

    // Prompt for user action
    if (this.destroyed) return;
    const selected = await select({
      message: chalk.bold('What would you like to do?'),
      choices,
    });

    if (this.destroyed) return;

    // Clear, bold confirmation output
    console.log('\n' + chalk.bold.cyan('You selected:'), chalk.white(selected));
    switch (selected) {
      case '🧑‍💻  View Dev Groups':
        console.log(chalk.gray('TODO: Show Dev Groups...'));
        break;
      case '👥   View Group Members':
        console.log(chalk.gray('TODO: Show Group Members...'));
        break;
      case '💬  Join Group Chat':
        console.log(chalk.gray('TODO: Join a Group Chat...'));
        break;
      case '📨  Start 1-on-1 Chat':
        console.log(chalk.gray('TODO: Start a Random 1-on-1 Chat...'));
        break;
      case '❌  Exit':
        process.exit(0);
    }
  }

  destroy() {
    this.destroyed = true;
  }
}
