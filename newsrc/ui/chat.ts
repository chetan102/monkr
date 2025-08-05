import blessed from 'blessed';
import chalk from 'chalk';
import gradient from 'gradient-string';

// Create screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'Monkr CLI Chat',
  fullUnicode: true,
  dockBorders: true,
  style: { bg: 0 }, // black background
});

// Header with subtle gradient
const header = blessed.box({
  top: 0,
  height: 3,
  width: '100%',
  tags: true,
  content: gradient('cyan', 'white')('   MONKR CLI CHAT   '),
  align: 'center',
  valign: 'middle',
  border: { type: 'line', fg: 8 }, // grey border
  style: { fg: 7, bg: 0 }, // white text, black bg
});

// Chat message box
const messages = blessed.box({
  top: 3,
  bottom: 5,
  left: 0,
  width: '100%',
  scrollable: true,
  alwaysScroll: true,
  keys: true,
  mouse: true,
  tags: true,
  padding: { left: 2, right: 2, top: 1, bottom: 1 },
  style: { fg: 7, bg: 0 }, // white fg, black bg
  border: { type: 'line', fg: 8 }, // grey border
  scrollbar: {
    ch: ' ',
    track: { bg: 8 },
    style: { bg: 7 },
  },
});

// Input box
const input = blessed.textbox({
  bottom: 0,
  height: 4,
  width: '100%',
  inputOnFocus: true,
  padding: { left: 2 },
  border: { type: 'line', fg: 8 }, // grey border
  style: { fg: 7, bg: 0, focus: { bg: 8 } }, // white fg, black bg, grey focus bg
  label: chalk.dim(' Type your message... '),
});

screen.append(header);
screen.append(messages);
screen.append(input);

input.focus();

// Format time (HH:mm)
function formatTime(): string {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Add message with subtle formatting and cyan highlight for user name
function addMessage(sender: string, text: string, isUser = false) {
  const time = formatTime();
  const name = isUser ? chalk.cyan(sender) : chalk.gray(sender);
  messages.pushLine(`{bold}${name}{/bold} {gray-fg}[${time}]{/gray-fg}: ${text}`);
  messages.setScrollPerc(100);
  screen.render();
}

// Dummy bot reply
function botReply(text: string) {
  setTimeout(() => {
    addMessage('Bot', `You said: ${text}`, false);
  }, 1200);
}

// Handle user input submit
input.on('submit', (text) => {
  if (!text.trim()) {
    input.clearValue();
    screen.render();
    return;
  }
  addMessage('You', text.trim(), true);
  botReply(text.trim());
  input.clearValue();
  screen.render();
  input.focus();
});

// Quit keys: ESC, q, Ctrl+C
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

screen.render();
