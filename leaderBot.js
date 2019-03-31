const Discord = require('discord.js');
const fs = require('fs');


module.exports = function(Leader) {
  
  Leader.Commands = new Discord.Collection();
  Leader.Aliases = new Discord.Collection();
  
  fs.readdir('./Events/', (err, files) => {
    if (err) {
     return console.log(`[Leader] Found an error while loading Leader's Events.\n${err.stack}`);
    };
      
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return;
      };
      
      const event = require(`./Events/${file}`);
      let eventName = file.split('.')[0];

      Leader.on(eventName, event.bind(null, Leader));
      delete require.cache[require.resolve(`./Events/${file}`)];
    });
  });
  
  fs.readdir('./Commands/', (err, files) => {
	  if (err) {
     return console.log(`[Leader] Found an error while loading Leader's Commands.\n${err.stack}`);
    };
    
	  let jsfiles = files.filter(f => f.split('.').pop() == 'js');
  
	  if (jsfiles.length <= 0) {
      return console.log('[Leader] No Commands to load.');
    };
  
	  jsfiles.forEach(f => {
		  let props = require(`./Commands/${f}`);
		  props.fileName = f;
		  Leader.Commands.set(props.help.name, props);
		  props.conf.Aliases.forEach(alias => {
			 Leader.Aliases.set(alias, props.help.name);
		  });
	  });
  });
  
  Leader.login(process.env.TOKEN).catch(err => {
    console.log(`[Leader] Found an error while connecting to Discord.\n${err.stack}`);
  });
  
  
};
