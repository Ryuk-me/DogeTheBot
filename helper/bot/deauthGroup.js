const Config = require('../../Config');
const ID = require('../../model/group');

// This command is OWNER only

module.exports = async (message, chat, client) => {

    if (message.body === Config.SUFFIX + "deauth" && (message.author === Config.ADMIN + "@c.us" || message.from === Config.ADMIN + "@c.us") && message.hasQuotedMsg) {
        let regex = /[0-9-]+.@g.us/gi;
        let quotedMsg = await message.getQuotedMessage();
        let group_id_to_remove_from_db = quotedMsg.body;
        group_id_to_remove_from_db = group_id_to_remove_from_db.match(regex)[0];
        const groupId = await ID.findOne({
            id: group_id_to_remove_from_db
        });
        if (groupId !== null) {
            groupId.deleteOne({
                id: group_id_to_remove_from_db
            });
            message.reply("Group's Authorization Revoked Successfully");
            try {
                client.sendMessage(group_id_to_remove_from_db, `✬ Group's Authorization Revoked By Owner ✬\n\nContact Owner to get Authorization`);
            } catch (err) {

            }
        } else {
            message.reply("✬ Group is Already Not Authorized ✬");
        }
    }
}