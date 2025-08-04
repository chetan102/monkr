// === FILE: src/features/groups.ts ===
import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';

const groups = [
  { name: 'TypeScript Wizards', membersOnline: 12 },
  { name: 'React Ninjas', membersOnline: 7 },
  { name: 'Node.js Hustlers', membersOnline: 5 },
  { name: 'AI/ML Enthusiasts', membersOnline: 3 },
  { name: 'Open Source Lovers', membersOnline: 9 }
];

export async function viewGroups() {
  console.clear();
  console.log(chalk.bold.blue('💻 Available Developer Groups'));
  console.log('----------------------------------\n');

  const groupChoices = groups.map((group) => ({
    name: `${group.name} (${group.membersOnline} online)`,
    value: group.name
  }));

  const selected = await select({
    message: 'Pick a group to join:',
    choices: groupChoices
  });

  const selectedGroup = groups.find(g => g.name === selected);
  if (selectedGroup) {
    //  startGroupChat(selectedGroup.name);
  }
}

export { groups };
