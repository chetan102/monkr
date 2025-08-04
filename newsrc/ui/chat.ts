import readline from 'readline';
import chalk from 'chalk';
import boxen from 'boxen';
import ansiEscapes from 'ansi-escapes';

const messages: { from: string; text: string }[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

function formatMessage(from: string, text: string, width: number): string {
  const fromLabel = {
    You: chalk.greenBright('🧑 You'),
    Bot: chalk.cyan('🤖 Bot'),
    Stranger: chalk.yellowBright('👤 Stranger'),
  }[from] || chalk.magentaBright(from);

  const msgBox = boxen(text, {
    padding: { left: 1, right: 1 },
    borderStyle: 'classic',
    borderColor: from === 'You' ? 'greenBright' : from === 'Bot' ? 'cyan' : 'yellowBright',
    width: Math.min(width - 10, 60),
  });

  return `${fromLabel}:\n${msgBox}`;
}

function render(groupName: string) {
  const termHeight = process.stdout.rows;
  const termWidth = process.stdout.columns;

  const header = boxen(chalk.bold.cyanBright(`💬  Monkr Chat — Group: ${groupName}`), {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'cyanBright',
    align: 'center',
    width: termWidth - 4,
  });

  const visibleHeight = termHeight - 10;
  const visibleMessages = messages.slice(-visibleHeight);
  const formatted = visibleMessages.map(msg => formatMessage(msg.from, msg.text, termWidth)).join('\n\n');

  const chatBox = boxen(formatted || chalk.gray('No messages yet...'), {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'gray',
    width: termWidth - 4,
    height: visibleHeight,
    title: '💬 Chat',
    titleAlignment: 'left',
  });

  process.stdout.write(ansiEscapes.clearScreen);
  console.log(header);
  console.log(chatBox);
  process.stdout.write(chalk.bold.green('\nType your message below (Ctrl+C to exit):\n\n'));
  rl.prompt(true);
}

function startChat(groupName: string) {
  messages.push({ from: 'Bot', text: `👋 Welcome to ${groupName}!` });
  messages.push({ from: 'Stranger', text: 'Hey, how are you?' });
  render(groupName);

  rl.setPrompt(chalk.greenBright('> '));
  rl.on('line', (input: string) => {
    const trimmed = input.trim();
    if (trimmed) {
      messages.push({ from: 'You', text: trimmed });
      render(groupName);

      setTimeout(() => {
        messages.push({ from: 'Bot', text: `You said: "${trimmed}"` });
        render(groupName);
      }, 500);
    } else {
      render(groupName);
    }
  });

  rl.on('SIGINT', () => {
    console.log(chalk.redBright('\n👋 Exiting chat. Goodbye!\n'));
    process.exit(0);
  });
}

const groupName = process.argv[2] || '#monkr-room';
startChat(groupName);
