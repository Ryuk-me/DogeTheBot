const Config = require('../../Config');


module.exports = async (message, chat, client) => {
    try {
        // if u tag very old messages it will crash the bot (cant fix this)

        if (message.body.startsWith(Config.SUFFIX + "tag")) {
            let admins = [];
            for (let i = 0; i < chat.participants.length; i++) {
                if (chat.participants[i].isAdmin) {
                    admins.push(chat.participants[i].id._serialized);
                }
            }
            if (admins.includes(message.author)) {
                let taggedby = message.author.replace("@c.us", "");
                let botID = message.to.replace("@c.us", "");
                let message_id = message.id._serialized;
                let msgObj = null;
                let extraMsgWithTag = null;
                if (message.hasQuotedMsg) {
                    msgObj = await message.getQuotedMessage();
                    await client.interface.openChatWindowAt(msgObj.id._serialized);
                    message_id = msgObj.id._serialized;
                }
                if (message.body.length > (Config.SUFFIX + 'tag').length) {
                    extraMsgWithTag = message.body.split(Config.SUFFIX + 'tag').join('').trim();
                }

                let membersToTag = [];
                for (let i = 0; i < chat.participants.length; i++) {
                    if (chat.participants[i].id.user === taggedby || chat.participants[i].id.user === botID) {
                        continue;
                    }
                    membersToTag.push(chat.participants[i].id.user);
                }
                try {
                    let real_mention = [];
                    membersToTag.forEach(element => {
                        real_mention.push({
                            id: {
                                _serialized: element + "@c.us"
                            }
                        })
                    });
                    let everyone_msg = `${extraMsgWithTag !== null ? extraMsgWithTag + "\n" : ""}@${membersToTag.join('@')}`
                    try {
                        chat.sendMessage(`${everyone_msg}`, {
                            mentions: real_mention,
                            quotedMessageId: message_id
                        });
                    } catch (type) {
                        // console.log('eerr');
                    }

                } catch {
                    //
                }

            } else {
                message.reply("Only Admins Can Use this Command");
            }
        }
    } catch {
        //
    }



}