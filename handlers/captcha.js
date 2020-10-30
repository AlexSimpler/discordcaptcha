//lets export the captcha "module" taking as parameter the client
//we also need RichEmbed from discord.js

//importing verified role id
const { roleID } = require("../config.json");
const Jimp = require("jimp");
const { randomBytes } = require("crypto");
const captcha = require('../utils/functions');

module.exports = (client, ops) => {
  /* Create the server before listener */
  //imported the captchapng module through ops
  let http = ops.http,
    captchapng = ops.captchapng,
    RichEmbed = ops.RichEmbed,
    Attachment = ops.Attachment;

  let code = parseInt(Math.random() * 9000 + 1000);


  client.on("guildMemberAdd", member => {
    captcha(code, member);
    //also add an isVerified boolean for later user aswell
    let isVerified = false;

    //then get the servers id using the member server id
    const joinedServer = client.guilds.get(member.guild.id);

    //Now listen to any message to check the captcha validity
    client.on("message", message => {
      //some ignores to filter messages being listened
      if (message.author.bot) return; //self-explanatory
      if (message.guild) return; //if message is sent inside a server ignore
      if (isVerified) return; //if user already verified return

      //create a regex to check if the input is a valid captcha code
      const check = /[0-9]{4}/.test(message.content);

      //test check
      if (check) {
        //check if entered message is equal to the captcha code
        if (message.content == code) {
          //get the joinedServer members and search for the author of the message and add him the verified role
          joinedServer.members.get(message.author.id).addRole(roleID);
          //can also do member.send()
          message.channel.send(`You were successfully verified ✅.\nYou can now proceed to **${member.guild}** .`);
          isVerified = true;
        } else {
          member.send("❌Invalid captcha code, please try again.");
          //resend embed message which regenerates a captcha code because we use /captcha.png url again!
          code = parseInt(Math.random() * 9000 + 1000);
          captcha(code, member);
          return;
        }
      } else {
        member.send("Please enter a valid captcha code");
      }
    });
  });
};//now lets test it
