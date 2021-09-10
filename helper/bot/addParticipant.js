const Config = require('../../Config');

module.exports = async (message, chat, client) => {
    if (message.body.startsWith(Config.SUFFIX + "add")) {
        let to_add = [message.body.split(' ')[1] + "@c.us"];
        let regex = /[0-9]+:/gi;

        if (message.hasQuotedMsg) {
            let msgObj = await message.getQuotedMessage();
            if (msgObj.vCards.length >= 1) {
                to_add = [msgObj.vCards[0].match(regex)[0].replace(":", "@c.us")];
            }
            if (msgObj.vCards.length === 0 && !msgObj.hasMedia) {
                to_add = [msgObj.body + "@c.us"];
            }
        }
        if (!to_add[0].startsWith('+')) {
            let admins = [];
            let allParticipants = []
            for (let i = 0; i < chat.participants.length; i++) {
                if (chat.participants[i].isAdmin) {
                    admins.push(chat.participants[i].id._serialized);
                }
                allParticipants.push(chat.participants[i].id._serialized);
            }

            if (admins.includes(message.author) && admins.includes(message.to)) {
                if (message.author === to_add[0]) {
                    message.reply("Trying to Add Yourself Huh ??");

                } else if (allParticipants.includes(to_add[0]) && message.to !== to_add[0]) {
                    message.reply("Already in *Group*");
                } else if (message.to === to_add[0]) {
                    message.reply("*Doge* ez already in *Group*");
                } else if (message.author !== to_add[0]) {
                    let isUserRegistered = await client.isRegisteredUser(to_add[0]);
                    if (isUserRegistered) {
                        const added_by_mention = await message.getContact();
                        await chat.addParticipants(to_add);
                        let added_member_mention = {
                            id: {
                                _serialized: to_add[0]
                            }
                        }
                        chat.sendMessage(`Successfully Added @${to_add[0].replace('@c.us','')} to Group.\nBy : @${added_by_mention.number}!`, {
                            mentions: [added_member_mention, added_by_mention],
                            quotedMessageId: message.id._serialized
                        });
                    } else {
                        message.reply("Not Registered on whatsapp");
                    }

                }
            } else if (!admins.includes(message.author)) {
                message.reply("Only Admins can perform this Action");
            } else if (!admins.includes(message.to)) {
                message.reply("Make *Doge* Admin to use this Command");
                const sticker = MessageMedia.fromFilePath('./dogeImages/doge-cry.jpg');
                chat.sendMessage(sticker, {
                    sendMediaAsSticker: true,
                    stickerAuthor: Config.STICKER_AUTHOR,
                    stickerName: Config.STICKER_NAME
                });
            }
        } else {
            message.reply("Please use this format \n" + Config.SUFFIX + "add 916234567890\n without (+)\n\n" + Config.SUFFIX + " help - to see how to use a command");
        }

    }
}