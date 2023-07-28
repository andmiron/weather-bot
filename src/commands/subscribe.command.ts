import {Scenes, Telegraf} from 'telegraf';
import {DatabaseClass} from '../db/database.class.js';
import {BotCommandInterface} from './bot.command.interface.js';
import {BotResponse, ScenesId} from '../types/types.js';

export class SubscribeCommand implements BotCommandInterface {
  command: string;
  description: string;

  private bot: Telegraf<Scenes.SceneContext>;
  private database: DatabaseClass;

  constructor(
    command: string,
    description: string,
    bot: Telegraf<Scenes.SceneContext>,
    database: DatabaseClass
  ) {
    this.command = command;
    this.description = description;
    this.bot = bot;
    this.database = database;
  }

  execute() {
    this.bot.command(this.command, async ctx => {
      const user = await this.database.findUser(ctx.from.id);

      if (!user) {
        await ctx.scene.enter(ScenesId.WEATHER_SCENE);
      } else {
        await ctx.reply(BotResponse.ALREADY_SUBSCRIBE);
      }
    });
  }
}
