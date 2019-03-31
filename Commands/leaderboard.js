const Discord = require("discord.js");
const db = require('quick.db')

module.exports.run = async (Leader, message, args) => { // eslint-disable-line no-unused-vars
 // if (!client.Developers.includes(message.author.id)) return message.channel.send(`This command is not public`)
await  db.startsWith(`guildBumpers_${message.guild.id}`,  { sort: '.data'}).then(resp => {
    
       resp.length = 10;
    
    let finalOutput = '';
    for ( var i in resp ){
      
      finalOutput += `<@${(resp[i].ID.split('_')[2])}> -- ${resp[i].data} MSGS\n`
      
    }
    
    let leaderEmbed = new Discord.RichEmbed()
    .setColor("BLURPLE")
    .setTitle(`**${message.guild.name} - Leaderboard**`)
    .setDescription(finalOutput)
    .setThumbnail(message.guild.iconURL)
    message.channel.send(leaderEmbed);
    
  });
};

exports.help = {
  name: "leaderboard",
  description: "",
  usage: "!Leaderboard"
};

exports.conf = {
  Aliases: []
};
