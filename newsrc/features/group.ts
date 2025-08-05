import chalk from 'chalk';
import inquirer from 'inquirer';

const groups = [
  { name: 'TypeScript Wizards', membersOnline: 12 },
  { name: 'React Ninjas', membersOnline: 7 },
  { name: 'Node.js Hustlers', membersOnline: 5 },
  { name: 'AI/ML Enthusiasts', membersOnline: 3 },
  { name: 'Open Source Lovers', membersOnline: 9 }
];

export async function viewGroups(): Promise<string | undefined> {
  console.clear();
  console.log(chalk.bold.blue('💻 Available Developer Groups'));
  console.log('----------------------------------\n');

  const groupChoices = groups.map(group => ({
    name: `${group.name} (${group.membersOnline} online)`,
    value: group.name,
  }));

  const response = await inquirer.prompt([
    {
      type: 'list',
      name: 'group',
      message: 'Pick a group to join:',
      choices: groupChoices
      
    },
  ]);

  // ✅ Simulate "clearPromptOnDone"
  console.clear();
  return response.group;
}

export { groups };
