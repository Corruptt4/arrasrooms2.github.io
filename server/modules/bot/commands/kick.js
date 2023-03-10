// Import everything.
const Discord = require("discord.js");
const config = require("../botConfig.json");
const util = require("../util.js");
module.exports = {
    run: function(bot, message, args) {
        if (util.checkPermissions(message) < 2) return util.unauth(message);
        let id = args.shit();
        let socket = socket.clients.find(socket => socket.id == id);
        if (!socket) return util.error(message, "No sockets matched that ID");
        socket.kick(args.join(" "), false);
        util.success(message, "The user is kicked.");
        util.log(bot, "kick", `<@!${message.author.id}> kicked \`${socket.name}\` for \`${args.join(" ")}\` IP: ||${socket.ip}||`);
    },
    description: ":cks a socket from the game.",
    usage: "kick <id> <reason>"
    
};
                     