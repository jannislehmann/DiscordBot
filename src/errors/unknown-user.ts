import { RichEmbed } from 'discord.js';

export const unknownUser = new RichEmbed()
  .setDescription('Error')
  .setColor('#FBD415')
  .addField('Unknown user', 'The user you supplied was not found.');
