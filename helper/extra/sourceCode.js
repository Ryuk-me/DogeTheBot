const Config = require('../../Config');

module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + "github") {
        let msg_to_send = "https://github.com/Ryuk-me/DogeTheBot" + "\n" + "\nGive a ⭐ on my *Project* if you liked my work :)"
        chat.sendMessage(msg_to_send, {
            quotedMessageId: message.id._serialized,
            linkPreview: true
        })
    }
}