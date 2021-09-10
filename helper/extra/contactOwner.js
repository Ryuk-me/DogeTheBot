const Config = require('../../Config');


module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + "contact") {
        let msg_to_send = Config.CONTACT_ME + "\n" + "\nContact Owner Here\nJust message your group details and you will get access(if slots are available)"
        chat.sendMessage(msg_to_send, {
            quotedMessageId: message.id._serialized,
            linkPreview: true
        })
    }
}