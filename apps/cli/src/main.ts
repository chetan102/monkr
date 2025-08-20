import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ALL_COMMANDS } from './commands';
import { createAppContext } from './context/context';

function startCLI() {
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


// Main Implementation
const ctx = createAppContext('cli');
ctx.ui.start();

// if (process.argv.length <= 2) ctx.ui.start();
// else startCLI();