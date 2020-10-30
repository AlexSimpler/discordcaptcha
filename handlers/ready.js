const env = require("dotenv");

module.exports = client => {
  //when bot is ready
  client.on("ready", () => {
    console.log(`Launched as ${client.user.tag}!`);
    client.user.setPresence({
      game: {
        name: "Help -> Flickery"
      }
    })
  });

  //logging in with the bot's token
  client.login(process.env.TOKEN);
};
