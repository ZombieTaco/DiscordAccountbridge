const Discord = require("discord.js");
const client = new Discord.Client();
const hook = new Discord.WebhookClient('WEBHOOK-ID', 'WEBHOOK-SECRET');
client.on('ready', () => {
  console.log('ready!');
});
client.on('message', msg => {
  if(msg.channel.id == "TARGET-CHANNEL") {
    if(msg.content){
      body = msg.content;
    }else {
      body = msg.attachments.first().url
    }
    author = msg.author.username;
    avatar = msg.author.avatarURL;
    hook.send(body, {username: author, avatarURL: avatar});
  }
  if(msg.author.bot) return;
  if(msg.channel.id == "INITIAL-CHANNEL"){
    if(msg.content){
      messagebody = msg.content;
      client.channels.get("TARGET-CHANNEL").send(messagebody);
    }else {
      messagebody = msg.attachments.first().url;
      client.channels.get("TARGET-CHANNEL").send({file: messagebody});
    }
  msg.delete(1000);
}
});
client.on('typingStart', (channel, user) => {
  if(channel.id == "INITIAL-CHANNEL") {
  client.channels.get("TARGET-CHANNEL").startTyping()
}
});
client.on('typingStop', (channel, user) => {
  if(channel.id == "INITIAL-CHANNEL") {
  client.channels.get("TARGET-CHANNEL").stopTyping(true)
}
});
client.login('TOKEN');
