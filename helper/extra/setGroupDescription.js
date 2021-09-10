const Config = require('../../Config');

module.exports = async (message, chat) => {
    if (message.body.startsWith(Config.SUFFIX + "setdesc")) {
        let admins = [];
        let setDescription;
        if (message.body.length > (Config.SUFFIX + 'setdesc').length) {
            setDescription = message.body.split(Config.SUFFIX + 'setdesc').join('').trim();
        } else if (message.hasQuotedMsg) {
            const quotedMsg = await message.getQuotedMessage();
            if (!quotedMsg.hasMedia) {
                setDescription = quotedMsg.body.trim();
            }
        }
        for (let i = 0; i < chat.participants.length; i++) {
            if (chat.participants[i].isAdmin) {
                admins.push(chat.participants[i].id._serialized);
            }
        }
        if (setDescription !== null) {
            if (admins.includes(message.author) && admins.includes(message.to)) {
                chat.setDescription(setDescription);
                message.reply("Group Description Changed to : " + setDescription);
            } else if (!admins.includes(message.author)) {
                message.reply("Only Admins can perform this action");
            } else if (!admins.includes(message.to)) {
                message.reply("Bot is not an Admin");
            }
        }

    }
}