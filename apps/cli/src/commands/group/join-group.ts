import { Command } from "../../types/command";

const JoinGroup: Command = {
  name: 'join <groupId>',
  description: 'Join a group chat by group ID',
  async run(args, ctx) {
    console.log(`Joining group with ID: ${args[0]}`);
  },
};

export default JoinGroup;
