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
        var text = args.slice(1);

        for (let i = 0; i < 10; ++i) {
            var generated = Data.nextWord(message.author.id, text[text.length - 1]);
            if (generated == text[text.length - 1]) continue;
            text.push(generated);
        }



        message.channel.send(text.join(" "));
    }
}