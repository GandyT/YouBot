const Discord = require("discord.js");
const Data = require("../data.js");

module.exports = {
    event: "message",
    async execute(message) {
        const client = this;

        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        if (message.content.startsWith(process.env.PREFIX)) {
            var env = {
                message: message,
                args: message.content
                    .toLowerCase()
                    .substr(process.env.PREFIX.length)
                    .split(" "),
                client: client
            };

            var command = client.commands.find(env.args[0]);
            if (command) return command.execute(env);
        }

        if (Data.userExists(message.author.id)) return Data.addSentence(message.author.id, message.content);
    }
}