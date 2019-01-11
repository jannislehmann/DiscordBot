import { RichEmbed } from 'discord.js';
import { ConfigManager } from '../managers/ConfigManager';

export const wrongCommandUsage = new RichEmbed()
  .setDescription('Error')
  .setColor('#FBD415')
  .addField('Wrong command usage', `See \`${ConfigManager.config.discord.commandPrefix}help\` for guidance.`);
