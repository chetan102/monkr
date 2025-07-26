import readline from 'readline';
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
async function figletAsync(text, options) {
    return new Promise((resolve, reject) => {
        figlet.text(text, options, (err, data) => {
            if (err || !data)
                reject(err);
            else
                resolve(data);
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
    console.log(boxen(chalk.bold('💬 Monkr: Where Devs Talk & Collaborate\n') +
        chalk.gray('Find groups, chat 1-on-1, build ideas together.'), {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
    }));
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
    console.clear();
    console.log(chalk.greenBright('\n💬 You’re now in a 1-on-1 chat room. Type "exit" to leave.\n'));
    rl.setPrompt(chalk.magenta('You > '));
    rl.prompt();
    rl.on('line', (line) => {
        if (line.trim().toLowerCase() === 'exit') {
            rl.removeAllListeners('line'); // clear the handler
            mainMenu(); // back to menu
            return;
        }
        // Fake reply (you can replace this with AI later)
        console.log(chalk.blue('MonkrBot > ') + chalk.gray(`I see you said: "${line.trim()}"`));
        rl.prompt(); // Keep asking for input
    });
}
function showHelp() {
    console.log('\n' + chalk.yellow.bold('📖 What is Monkr?\n'));
    console.log(chalk.gray('Monkr is your minimalist dev hangout inside the terminal.\n' +
        'Find people building similar things, chat, share, and start collaborating.\n' +
        'Perfect for indie makers, startup hackers, or AI tinkerers.'));
}
(async () => {
    await showTitle();
    await mainMenu();
})();
