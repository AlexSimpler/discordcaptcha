const captchapng = require('captchapng2');
const { Attachment, RichEmbed } = require('discord.js');

module.exports = (code, member) => {
    let png = new captchapng(80, 30, code);

    const Attached = new Attachment(
        png.getBuffer(),
        "captcha.png"
    );

    const verifMsg = new RichEmbed()
        .setTitle("Captcha Verification")
        .setColor("RANDOM")
        .setDescription("Please enter the captcha code below:")
        //attach the captcha.png image to this embed
        .attachFile(Attached)
        //then set it an image
        .setImage("attachment://captcha.png");

    //send to the user who tried to join our server the captcha embed
    member.send(verifMsg).catch(err => console.error);
}