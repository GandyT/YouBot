/* EXTERNAL MODULES */
const Discord = require("discord.js");
const Data = require("../data.js");
const Fs = require("fs");

module.exports = {
    names: ["blacklist", "bl"],
    desc: "blacklists a user",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        if (message.author.id !== "782217735013662782")
            return message.channel.send("You do not have enough permission for this command");
        if (!args[1]) return message.channel.send("Specify an id");
        var blacklist = JSON.parse(Fs.readFileSync("blacklist.json"));
        if (blacklist.find(i => i == args[1])) return message.channel.send("That user is already blacklisted");
        if (Data.userExists(args[1])) Data.removeUser(args[1]);
        blacklist.push(args[1]);
        Fs.writeFileSync("blacklist.json", JSON.stringify(blacklist));
        message.channel.send("User blacklisted!");
    }
}