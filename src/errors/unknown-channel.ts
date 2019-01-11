import { RichEmbed } from 'discord.js';

export const unknownChannel = new RichEmbed()
  .setDescription('Error')
  .setColor('#FBD415')
  .addField('Unknown channel', 'The channel you supplied was not found.');
