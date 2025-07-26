import blessed from 'blessed';
import chalk from 'chalk';

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  title: 'MonkrChat',
});

// Message box (no borders, scrollable)
const chatBox = blessed.box({
  top: 1,
  left: 2,
  width: '95%',
  height: '85%',
  tags: true,
  scrollable: true,
  alwaysScroll: true,
  mouse: true,
  keys: true,
  vi: true,
  style: {
    fg: 'white',
    bg: '',
    scrollbar: {
      bg: 'magenta',
    },
  },
  scrollbar: {
    ch: ' ',
  },
});

// Input box (borderless, with placeholder)
const inputBox = blessed.textbox({
  bottom: 0,
  left: 2,
  width: '95%',
  height: 3,
  inputOnFocus: true,
  keys: true,
  mouse: true,
  padding: {
    left: 1,
  },
  style: {
    fg: 'white',
    bg: '',
  },
});

// Placeholder hint
const inputPlaceholder = blessed.box({
  bottom: 0,
  left: 3,
  height: 3,
  content: chalk.gray('Type your message...'),
  tags: true,
  style: {
    fg: 'gray',
  },
});

// Heading
const heading = blessed.box({
  top: 0,
  left: 'center',
  width: 'shrink',
  height: 1,
  content: chalk.bold.cyanBright('💬 MonkrChat'),
  tags: true,
});

// Add elements to screen
screen.append(heading);
screen.append(chatBox);
screen.append(inputBox);
screen.append(inputPlaceholder);

// Chat message store
const chatMessages: string[] = [];

// Render chat
function renderChat() {
  chatBox.setContent(chatMessages.join('\n'));
  chatBox.scrollTo(chatMessages.length);
  screen.render();
}

// Send a message
function sendMessage(sender: 'You' | 'Bot', message: string) {
  const timestamp = new Date().toLocaleTimeString();
  const formatted = sender === 'You'
    ? `{gray-fg}[${timestamp}]{/} {magenta-fg}${sender}:{/} ${message}`
    : `{gray-fg}[${timestamp}]{/} {blue-fg}${sender}:{/} {gray-fg}${message}{/}`;
  chatMessages.push(formatted);
  renderChat();
}

// Focus input on load
inputBox.focus();
screen.render();

// Input handling
inputBox.on('focus', () => {
  inputPlaceholder.hide();
  screen.render();
});

inputBox.on('blur', () => {
  if (!inputBox.getValue()) inputPlaceholder.show();
  screen.render();
});

inputBox.on('submit', (text) => {
  const trimmed = text.trim();
  if (trimmed) {
    sendMessage('You', trimmed);
    setTimeout(() => sendMessage('Bot', `You said: "${trimmed}"`), 800);
  }
  inputBox.clearValue();
  inputBox.focus();
  inputPlaceholder.show();
  screen.render();
});

// Fake messages every 3 seconds
setInterval(() => {
  const msgs = [
    'Hello!',
    'What are you working on?',
    'MonkrChat is looking clean 👌',
    'Try typing something...',
    'This is a fake bot message.',
  ];
  const random = msgs[Math.floor(Math.random() * msgs.length)];
  sendMessage('Bot', random);
}, 3000);

// Exit on Escape, q, or Ctrl+C
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
