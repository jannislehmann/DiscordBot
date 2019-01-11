import { RichEmbed } from 'discord.js';

export const userNotMuted = new RichEmbed()
  .setDescription('Error')
  .setColor('#FBD415')
  .addField('Not muted', 'The user you supplied is not muted.');
