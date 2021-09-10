const Config = require('../../Config');


module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + "info" ) {
        message.reply(`
⊛ *Group Details* ⊛
● Name : ${chat.name}
● Description : ${chat.description === undefined ? '' :chat.description}
● Created At : ${chat.createdAt.toString()}
● Created By : ${chat.owner.user}
● Participants : ${chat.participants.length}
● Group ID : ${chat.id._serialized}
`);
    }
}