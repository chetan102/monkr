import inquirer from 'inquirer';

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

ask();
