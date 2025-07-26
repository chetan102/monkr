import inquirer from 'inquirer';
import { Separator } from '@inquirer/checkbox';
import { rainbow } from 'gradient-string';

async function ask() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Pick one framework:',
            choices: ['React', 'Vue', 'Svelte'],
        },
    ]);

    console.log(`You picked: ${answer.choice}`);
}

async function checkbox() {
    const answer = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'packageManager',
            message: 'Select a package manager',
            choices: [
                { name: 'npm', value: 'npm' },
                { name: 'yarn', value: 'yarn' },
                new Separator(),
                { name: 'pnpm (disabled)', value: 'pnpm', disabled: true },
            ],
        },
    ]);

    console.log('Selected:', rainbow(answer.packageManager));
}

async function editor() {
    const answer = await inquirer.prompt([
        {
            type: 'editor',
            name: 'description',
            message: 'Enter a description',
        },
    ]);

    console.log()

}


const expand = async () => {
    let answer;

    answer = await inquirer.prompt({
        type: "expand",
        name: "expand",
        message: 'Conflict on `file.js`:',
        choices: [
            {
                key: 'y',
                name: 'Overwrite',
                value: 'overwrite',
            },
            {
                key: 'a',
                name: 'Overwrite this one and all next',
                value: 'overwrite_all',
            },
            {
                key: 'd',
                name: 'Show diff',
                value: 'diff',
            },
            {
                key: 'x',
                name: 'Abort',
                value: 'abort',
            },
        ],
    });
    console.log('Answer:', answer);

    answer = await inquirer.prompt({
        type: "expand",
        name: "expand2",
        expanded: true,
        message: '(Auto-expand) Conflict on `file.js`:',
        choices: [
            {
                key: 'y',
                name: 'Overwrite',
                value: 'overwrite',
            },
            {
                key: 'a',
                name: 'Overwrite this one and all next',
                value: 'overwrite_all',
            },
            {
                key: 'd',
                name: 'Show diff',
                value: 'diff',
            },
            {
                key: 'x',
                name: 'Abort',
                value: 'abort',
            },
        ],
    });
    console.log('Answer:', answer);
};

async function input() {
    const inputInquirer = await inquirer.prompt({
        type: "rawlist",
        name: "newInput",
        message: 'Select a package manager',
        choices: [
            { name: 'npm', value: 'npm' },
            { name: 'yarn', value: 'yarn' },
            { name: 'pnpm', value: 'pnpm' },
        ],
    })

    console.log("input inquirer", rainbow(inputInquirer.newInput));
}

// await ask();
// await checkbox();
// await editor()

// await expand()
await input()