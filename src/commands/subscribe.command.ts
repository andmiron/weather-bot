import {CommandClass} from './command.class.js';

export class SubscribeCommand extends CommandClass {
  constructor(command: string, description: string) {
    super(command, description);
  }

  async execute(ctx: any): Promise<void> {
    const user = await this.dbInstance.findUser(ctx.from.id);

    if (!user) {
      await ctx.scene.enter('weatherScene');
    } else {
      await ctx.reply(`You already have subscription.\nTo update data use /update`);
    }
  }
}
