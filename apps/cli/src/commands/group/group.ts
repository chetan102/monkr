import { Command } from "../../types/command";

const groups: Command = {
  name: 'groups',
  description: 'List all available chat groups',
  async run(_, ctx) {
    console.log('Available chat groups:');
  },
};

export default groups;
