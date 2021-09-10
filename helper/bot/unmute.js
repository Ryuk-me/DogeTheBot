const Config = require('../../Config');


module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + "unmute") {
        let admins = [];
        for (let i = 0; i < chat.participants.length; i++) {
            if (chat.participants[i].isAdmin) {
                admins.push(chat.participants[i].id._serialized);
            }
        }
        if (admins.includes(message.author)) {
            await chat.unmute();
            message.reply("Chat is Unmuted");
        } else {
            message.reply("Only Admins can perform this action");
        }

    }
}