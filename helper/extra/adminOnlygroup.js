const Config = require('../../Config');

module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + "adminonly") {
        let admins = [];
        for (let i = 0; i < chat.participants.length; i++) {
            if (chat.participants[i].isAdmin) {
                admins.push(chat.participants[i].id._serialized);
            }
        }
        if (admins.includes(message.author) && admins.includes(message.to)) {
            await chat.setMessagesAdminsOnly([true]);
        } else if (!admins.includes(message.author)) {
            message.reply("Only Admins can perform this action");
        } else if (!admins.includes(message.to)) {
            message.reply("Bot is not an Admin");
        }
    }
}