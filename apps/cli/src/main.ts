import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { AppController } from './core/app-controller';
import { ALL_COMMANDS } from './commands';
import { createAppContext } from './core/context';
import { UIManager } from './core/ui-manager';

function startCLI() {
    const ctx = createAppContext('cli');
    ctx.app = new AppController(ctx);

    const y = yargs(hideBin(process.argv))
        .scriptName('monkr')
        .usage('$0 <command> [args]')
        .help();

    Object.values(ALL_COMMANDS).forEach(cmd => {
        y.command(
            cmd.name,
            cmd.description,
            () => { },
            async argv => {
                const args = argv._.slice(1).map(String);
                console.log(`Running command: ${cmd.name} with args: ${args.join(', ')}`);
                await cmd.run(args, ctx);
            }
        );
    });
    y.parse();
}

function startUI() {
    console.log('Starting UI...');
    const uiManager = new UIManager();
    uiManager.start();
}

// If no command (just 'monkr'), start UI
console.log("process.argv.length:", process.argv);
if (process.argv.length <= 2) startUI();
else startCLI();

