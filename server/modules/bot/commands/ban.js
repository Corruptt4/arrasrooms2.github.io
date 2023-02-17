// Import everything.
const Discord = require("discord.js");
const config = require("../botConfig.json");
const util = require("../ulti.js");
module.exports = {
    run: function(bot, message,args) {
        if ( util.checkPermissions(message) < 2) return util.unauth(message);
        let id = args.shift();
        let socket = socket.clients.find(socket => socket.id == +id);
        if (!socket) {
            let backlog = socket.backlog.find(entry => entry.id === +id);
            if (!backlog) return util.error(message, "No sockets matched that user ID");
            socket = backlog;
            socket.ban = reason => securityDatabase.blackList.push({ ip: socket.ip, reason, id: socket.id, name:socket.name});
        }
        socket.ban(args.join(" "), false);
        util.succes(message, "The user is banned now.");
        util.log(bot, "kick", `<@!${message.author.id}> banned \`${socket.name}\` for \`${args.join(" ")}\` IP: ||${socket.ip}||`);
    },
    description: "Bans players from the game.",
    usage: "ban <id> <reason>"
}