const Config = require('../../Config');
const ID = require('../../model/group');
const {
    MessageMedia
} = require('whatsapp-web.js');

const nsfwAuth = async (message, chat) => {
    if (message.body === Config.SUFFIX + "nsfwauth") {
        let admins = [];
        for (let i = 0; i < chat.participants.length; i++) {
            if (chat.participants[i].isAdmin) {
                admins.push(chat.participants[i].id._serialized);
            }
        }
        if (admins.includes(message.author) && admins.includes(message.to)) {

            const groupId = await ID.findOne({
                id: chat.id._serialized
            });
            if (!groupId.NSFW) {
                await ID.updateOne({
                    _id: groupId._id
                }, {
                    $set: {
                        NSFW: true
                    }
                });
                message.reply(`*NSFW* Enabled\n\nUse Command\n${Config.SYMBOL} ${Config.SUFFIX}help ${Config.ARROW_SYMBOL} to see updated commands`);
                const sticker = MessageMedia.fromFilePath('./dogeImages/horny.jpg');
                chat.sendMessage(sticker, {
                    sendMediaAsSticker: true,
                    stickerAuthor: Config.STICKER_AUTHOR,
                    stickerName: Config.STICKER_NAME
                });

            } else {
                message.reply("*NSFW* Already Enabled");
            }
        } else if (!admins.includes(message.author)) {
            message.reply("Only admins can perform this action");
        } else if (!admins.includes(message.to)) {
            message.reply("Make bot *ADMIN* to use this command");
        }
    }
}
const nsfwdeAuth = async (message, chat) => {
    if (message.body === Config.SUFFIX + "nsfwdeauth") {
        let admins = [];
        for (let i = 0; i < chat.participants.length; i++) {
            if (chat.participants[i].isAdmin) {
                admins.push(chat.participants[i].id._serialized);
            }
        }
        if (admins.includes(message.author) && admins.includes(message.to)) {
            const groupId = await ID.findOne({
                id: chat.id._serialized
            });
            if (groupId.NSFW) {
                await ID.updateOne({
                    _id: groupId._id
                }, {
                    $set: {
                        NSFW: false
                    }
                });
                message.reply("*NSFW* Disabled");
            } else {
                message.reply("*NSFW* Already Disabled");
            }
        } else if (!admins.includes(message.author)) {
            message.reply("Only admins can perform this action");
        } else if (!admins.includes(message.to)) {
            message.reply("Make bot *ADMIN* to use this command");
        }
    }
}

module.exports = {
    nsfw_auth: nsfwAuth,
    nsfw_deauth: nsfwdeAuth
};