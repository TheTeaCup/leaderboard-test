const Discord = require("discord.js");
const db = require('quick.db');

module.exports = async(Leader, message) => {

  if (message.author.bot) return undefined;
  if (message.channel.type != "text") return undefined;

  
  db.add(`guildBumpers_${message.guild.id}_${message.author.id}`, 1)
  
  let Prefix = "!";
  if (message.content.indexOf(Prefix) !== 0) return undefined;
    
  let args = message.content.slice(Prefix.length).trim().split(/ +/g);
  let Command = args.shift().toLowerCase();

  let Command;
	if (Leader.Commands.has(Command)) { 
    Command = Mythical.Commands.get(Command);	
  } else if (Leader.Aliases.has(Command)) { 
    Command = Leader.Commands.get(Leader.Aliases.get(Command));	
  } else {
    //return message.channel.send(`${Konah} | Unknown Command.`)
  };
  
	Command.run(Leader, message, args);
};
