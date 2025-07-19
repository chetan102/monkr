import blessed from 'blessed';

const screen = blessed.screen({
  smartCSR: true,
  title: 'Blessed CLI Demo',
});

const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Welcome to Blessed UI',
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: 'blue',
    border: { fg: '#ffffff' },
  },
});

screen.append(box);
screen.render();

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
