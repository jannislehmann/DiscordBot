# Discord Bot [![Build Status](https://travis-ci.com/Cludch/DiscordBot.svg?branch=master)](https://travis-ci.com/Cludch/DiscordBot)

This bot originated from [my fork](https://github.com/Cludch/discord-auto-grouping) of CritCola's auto grouping bot for Discord.

Since I wanted to add some further functionality like simple commands and events (mainly for fun),
I decided to use my old Steam bot for that and change a few lines in order to work with Discord and not Steam.

## Auto Grouping
In my scenario, I have two channels in a voice category called `🎮 Gaming` and `🎮 Other Stuff`. Whenever someone joins in either
of those channels, the bot creates a duplica of it and moves the user into the newly created channel.
This is often not needed due to the low amount of users and friends on our Discord,
but this was a nice way to get into playing around with Discord.

## Commands and Events
Adding a new file into the corresponding directory with the same content as the other commands/events, will automatically
listen to the event or add a new command.

## Database connection
This bot uses a MongoDB connection to save some of its states like the activity and command prefix. Also not needed, was already in the
old bot and just some easy copy - pasta.
