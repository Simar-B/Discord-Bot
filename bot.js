const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const axios = require('axios');
const url = 'https://sv443.net/jokeapi/category/Programming'

async function getJoke(){

  const  joke = await axios.get(url)
    .then(resp => {
      return resp.data
    })
    .catch(function(error) {
      console.log(error)
    });


    if(joke.type === "twopart"){
      return joke.setup + '\n' + joke.delivery
    }
    else{
      return joke.joke
    }
  }

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {

  if (msg.content === '!joke') {
    getJoke()
    .then(joke => msg.channel.send(joke))
    .catch(error => msg.channel.send(error))

  }
});

client.login(auth.token);
