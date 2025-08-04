// === FILE: src/ui/dashboard.ts ===
import inquirer from 'inquirer';
// import { viewMembers } from '../features/members.js';
// import { joinGroupChat } from '../features/groupChat.js';
// import { startPrivateChat } from '../features/privateChat.js';
// import { showAbout } from './about.js';
import { viewGroups } from '../features/group.js';

export async function showDashboard() {
    console.clear();
    console.log('🧘 Welcome to Monkr CLI');
    console.log('-------------------------\n');

    const { selectedOption } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedOption',
        message: 'What would you like to do?',
        choices: [
          '🧑‍💻 View Dev Groups',
          '👥 View Group Members',
          '💬 Join Group Chat',
          '📨 Start 1-on-1 Chat',
          '📖 What is Monkr?',
          '❌ Exit'
        ]
      }
    ]);

    switch (selectedOption) {
      case '🧑‍💻 View Dev Groups':
        await viewGroups();
        break;
      case '👥 View Group Members':
        // await viewMembers();
        break;
      case '💬 Join Group Chat':
        // await joinGroupChat();
        break;
      case '📨 Start 1-on-1 Chat':
        // await startPrivateChat();
        break;
      case '📖 What is Monkr?':
        // await showAbout();
        break;
      case '❌ Exit':
        console.log('\n👋 Goodbye!\n');
        process.exit(0);
    }

    // Wait before returning to dashboard
    // await inquirer.prompt([
    //   {
    //     type: 'input',
    //     name: 'continue',
    //     message: '\nPress Enter to return to dashboard...'
    //   }
    // ]);
}
