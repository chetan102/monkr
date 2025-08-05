import blessed from 'blessed';
import chalk from 'chalk';
import gradient from 'gradient-string';

export async function startChatUI(groupName: string): Promise<void> {
    return new Promise((resolve) => {
        const screen = blessed.screen({
            smartCSR: true,
            title: `Monkr CLI Chat - ${groupName}`,
            fullUnicode: true,
            dockBorders: true,
            style: { bg: 0 }, // black background
        });

        // Header with group name under gradient
        const header = blessed.box({
            top: 0,
            height: 3,
            width: '100%',
            tags: true,
            content:
                gradient('cyan', 'white')(`   MONKR CLI CHAT   `) +
                `\n {bold}${chalk.yellow(groupName)}{/bold}`,
            align: 'center',
            valign: 'middle',
            border: { type: 'line', fg: 8 },
            style: { fg: 7, bg: 0 },
        });

        const messages = blessed.box({
            top: 4,
            bottom: 6,
            left: 0,
            width: '100%',
            scrollable: true,
            alwaysScroll: true,
            keys: true,
            mouse: true,
            tags: true,
            padding: { left: 2, right: 2, top: 1, bottom: 1 },
            style: { fg: 7, bg: 0 },
            border: { type: 'line', fg: 8 },
            scrollbar: {
                ch: ' ',
                track: { bg: 8 },
                style: { bg: 7 },
            },
        });

        const input = blessed.textbox({
            bottom: 0,
            height: 6,
            width: '100%',
            inputOnFocus: true,
            padding: { left: 2, right: 2, top: 1, bottom: 1 },
            border: { type: 'line', fg: 8 },
            style: {
                fg: 7,
                bg: 0,
                focus: { border: { fg: 7 } },
                hover: { border: { fg: 7 } },
            },
            label: chalk.dim(' Type your message... '),
            keys: true,
            mouse: true,
        });

        screen.append(header);
        screen.append(messages);
        screen.append(input);
        input.focus();

        function formatTime() {
            const d = new Date();
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        function addMessage(sender: string, text: string, isUser = false) {
            const time = formatTime();
            const name = isUser ? chalk.cyan(sender) : chalk.gray(sender);
            messages.pushLine(`{bold}${name}{/bold} {gray-fg}[${time}]{/gray-fg}: ${text}`);
            messages.pushLine('');
            messages.setScrollPerc(100);
            screen.render();
        }

        function botReply(text: string) {
            setTimeout(() => {
                addMessage('Bot', `You said: ${text}`, false);
            }, 1200);
        }

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

        // On exit keys destroy screen and resolve promise
        screen.key(['escape', 'q', 'C-c'], () => {
            addMessage('System', chalk.gray('Leaving chat... Returning to group list.'));
            screen.render();

            setTimeout(() => {
                screen.destroy(); // Clean up current chat screen
                resolve();        // Return to index.ts and viewGroups() again
            }, 600);
        });

        screen.render();
    });
}
