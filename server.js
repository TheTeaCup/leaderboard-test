// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


const Discord = require('discord.js');
const db = require('quick.db')

/* Creating Leader, our main client used. */
const Leader = new Discord.Client({
  fetchAllMembers: true
});


const discord = require('./leaderBot.js')(Leader);

app.get('/leader/:ID', async(req, res) => {
await  db.startsWith(`guildBumpers_${req.params.ID}`,  { sort: '.data'}).then(resp => {
let out = [];
  
   for ( var i in resp ){
          out[out.length] = {
          
            tag: Leader.users.get(resp[i].ID.split('_')[2]).tag,
            username: Leader.users.get(resp[i].ID.split('_')[2]).username,
            balance: resp[i].data,
            avatar: Leader.users.get(resp[i].ID.split('_')[2]).displayAvatarURL.split('?')[0],
           
        };
   };
  
  res.render(process.cwd() + '/views/leader.ejs', {bot:Leader, memberData: out });

});
});
