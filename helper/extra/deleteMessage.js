const Config = require('../../Config');

module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + 'delete') {
        if (message.hasQuotedMsg) {
            let admins = [];
            for (let i = 0; i < chat.participants.length; i++) {
                if (chat.participants[i].isAdmin) {
                    admins.push(chat.participants[i].id._serialized);
                }
            }
            if (admins.includes(message.author)) {
                const quotedMsg = await message.getQuotedMessage();
                if (quotedMsg.fromMe) {
                    try {
                        quotedMsg.delete(true);
                    } catch {
                        return;
                    }

                } else {
                    message.reply('I can only delete my own messages');
                }
            } else {
                message.reply("Only admins can perform this action");
            }
        } else {
            message.reply("Please reply to the message you want to delete");
        }
    }
}