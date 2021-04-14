/* EXTERNAL MODULES */
const Discord = require("discord.js");
const Data = require("../data.js");

module.exports = {
    names: ["generate", "g"],
    desc: "continues the sentence",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        if (!Data.userExists(message.author.id)) return message.channel.send("You do not have any data");

        message.channel.send(Data.generatePhrase(message.author.id));
    }
}