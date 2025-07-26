import blessed from 'blessed';
import chalk from 'chalk';

// Create screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'MonkrChat',
});

// Chat Box (no border, clean layout)
const chatBox = blessed.box({
  top: 1,
  left: 2,
  width: '95%',
  height: '70%', // leave more room for spacing
  tags: true,
  scrollable: true,
  alwaysScroll: true,
  mouse: true,
  keys: true,
  vi: true,
  style: {
    fg: 'white',
    scrollbar: {
      bg: 'magenta',
    },
  },
  scrollbar: {
    ch: ' ',
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

// Input Wrapper with border and Y gap
const inputWrapper = blessed.box({
  bottom: 1,
  width: '95%',
  height: 5,
  border: {
    type: 'line',
  },
  style: {
    border: {
      fg: 'gray',
    },
  },
});

// Input Textbox
const inputBox = blessed.textbox({
  parent: inputWrapper,
  top: 0,
  left: 1,
  width: '100%-2',
  height: 3,
  inputOnFocus: true,
  mouse: true,
  keys: true,
  padding: {
    left: 1,
  },
  style: {
    fg: 'white',
    bg: '',
  },
});

// Placeholder (shown only when empty and not focused)
const inputPlaceholder = blessed.box({
  parent: inputBox,
  top: 0,
  left: 0,
  height: 1,
  width: '100%',
  content: chalk.gray('Type your message...'),
  tags: true,
//   style: {
//     fg: 'gray',
//   },
});

// Add to screen
screen.append(heading);
screen.append(chatBox);
screen.append(inputWrapper);

// Messages
const chatMessages: string[] = [];

function renderChat() {
  chatBox.setContent(chatMessages.join('\n'));
  chatBox.scrollTo(chatMessages.length);
  screen.render();
}

function sendMessage(sender: 'You' | 'Bot', message: string) {
  const formatted = sender === 'You'
    ? `{magenta-fg}${sender}:{/} ${chalk.white(message)}`
    : `{blue-fg}${sender}:{/} {gray-fg}${message}{/}`;
  chatMessages.push(formatted);
  renderChat();
}

// Placeholder visibility handling
function updatePlaceholder() {
  const value = inputBox.getValue()?.trim();
  if (!value && screen.focused !== inputBox) {
    inputPlaceholder.show();
  } else {
    inputPlaceholder.hide();
  }
}

// Focus + blur behavior
inputBox.on('focus', () => {
  updatePlaceholder();
  screen.render();
});
inputBox.on('blur', () => {
  updatePlaceholder();
  screen.render();
});

// Submit message
inputBox.on('submit', (text) => {
  const trimmed = text.trim();
  if (trimmed) {
    sendMessage('You', trimmed);
    setTimeout(() => sendMessage('Bot', `You said: "${trimmed}"`), 800);
  }
  inputBox.clearValue();
  updatePlaceholder();
  inputBox.focus();
  screen.render();
});

// Auto fake bot messages
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
}, 6000);

// Initial focus and render
inputBox.focus();
screen.render();

// Exit keys
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
