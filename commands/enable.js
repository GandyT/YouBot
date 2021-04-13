/* EXTERNAL MODULES */
const Discord = require("discord.js");
const Data = require("../data.js");
const Fs = require("fs");

module.exports = {
    names: ["enable", "e"],
    desc: "the bot will start collecting data about how you speak.",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        var blacklist = JSON.stringify(Fs.readFileSync("blacklist.json"));
        if (blacklist.find(i => i == message.author.id)) return message.channel.send("You have been blacklisted from the bot");

        if (Data.userExists(message.author.id))
            return message.channel.send("You already have this bot enabled.");
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**ENABLED**")
                .setDescription("Note: please refrain from spamming. this will provide inaccurate results")
        );
        Data.addUser(message.author.id);
    }
}