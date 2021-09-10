const Config = require('../../Config');
const ID = require('../../model/group');
const countMessage = require('../../model/messagecount');
const customCommand = require("../../model/customCommand");
const {
    MessageMedia
} = require('whatsapp-web.js');


module.exports = async (client) => {
    client.on('group_join', async (notification) => {
        if (notification.recipientIds[0] === Config.BOT_NUMBER + "@c.us") {
            // Thank you adding doge the bot to group
            let addedBy = notification.author;
            let message_id = notification.id.remote;

            let addedBy_mention = {
                id: {
                    _serialized: addedBy
                }
            }
            client.sendMessage(message_id, `Thank you @${addedBy.replace("@c.us","")}! for Adding *Doge* to the group\n\nUse command\n\n${Config.SYMBOL} ${Config.SUFFIX}info ${Config.ARROW_SYMBOL} and send this msg to owner of the bot to get access\n\n${Config.SYMBOL} ${Config.SUFFIX}status ${Config.ARROW_SYMBOL} to check group authorization status\n\n${Config.SYMBOL} ${Config.SUFFIX}contact ${Config.ARROW_SYMBOL} you will get a link to contact Owner\n\nRemember to make Doge Admin to use its all features\n\nRead *Terms and conditions* before using this bot https://telegra.ph/Doge-Bot-Terms-and-Conditions-07-14`, {
                mentions: [addedBy_mention],
            });
            const sticker = MessageMedia.fromFilePath('./dogeImages/Doge-Flower.jpeg');
            client.sendMessage(message_id, sticker, {
                sendMediaAsSticker: true,
                stickerAuthor: Config.STICKER_AUTHOR,
                stickerName: Config.STICKER_NAME
            });
        } else {

            let added = notification.recipientIds[0];
            let message_id = notification.id.remote;

            let added_mention = {
                id: {
                    _serialized: added
                }
            }
            client.sendMessage(message_id, `Hey @${added.replace("@c.us","")}! 👋\nWelcome to the Group`, {
                mentions: [added_mention],
            });

        }
    });
    client.on('group_leave', async (notification) => {
        if (notification.recipientIds[0] === Config.BOT_NUMBER + "@c.us") {
            let group_id_to_remove_from_db = notification.id.remote

            let isAnyCommandAvailable = await customCommand.findOne({
                id: group_id_to_remove_from_db
            });

            if (isAnyCommandAvailable !== null) {
                isAnyCommandAvailable.deleteOne({
                    id: group_id_to_remove_from_db
                });
            }
            const groupId = await ID.findOne({
                id: group_id_to_remove_from_db
            });
            const message_count = await countMessage.findOne({
                id: group_id_to_remove_from_db
            });
            if (message_count !== null) {
                message_count.deleteOne({
                    id: group_id_to_remove_from_db
                });
            }
            if (groupId !== null) {
                groupId.deleteOne({
                    id: group_id_to_remove_from_db
                });
            }
        } else {
            let left = notification.recipientIds[0];
            let message_id = notification.id.remote;

            let left_mention = {
                id: {
                    _serialized: left
                }
            }
            if (notification.author === undefined) {
                client.sendMessage(message_id, `@${left.replace("@c.us","")} Left 😢`, {
                    mentions: [left_mention],
                });
            }

        }
    });
}