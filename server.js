//import necessary resources for our bot
const { Client, Collection, RichEmbed, Attachment } = require("discord.js");
const client = new Client();
//for environement variables
const env = require("dotenv");
env.config();

//import required captcha module
const captchapng = require("captchapng2");
const http = require("http");

//we also need http module from nodejs
let ops = {
  captchapng,
  http,
  RichEmbed,
  Attachment
}


//lets import captcha.js and run it
require("./handlers/captcha")(client, ops);
require('./handlers/ready')(client)
