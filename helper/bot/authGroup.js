const Config = require('../../Config');
const ID = require('../../model/group');

// This command is OWNER only

module.exports = async (message, chat, client) => {
    if (message.body === Config.SUFFIX + "auth" && (message.author === Config.ADMIN + "@c.us" || message.from === Config.ADMIN + "@c.us") && message.hasQuotedMsg) {
        let regex = /[0-9-]+.@g.us/gi;
        let quotedMsg = await message.getQuotedMessage();
        let group_id_to_add_to_db = quotedMsg.body;
        group_id_to_add_to_db = group_id_to_add_to_db.match(regex)[0];
        const groupId = await ID.findOne({
            id: group_id_to_add_to_db
        });
        if (groupId === null) {
            var newID = new ID();
            newID.id = group_id_to_add_to_db;
            await newID.save();
            message.reply("Group Authorized Successfully");
            try {
                client.sendMessage(group_id_to_add_to_db, `✬ Group Authorized By Owner ✬\n\n${Config.SYMBOL} ${Config.SUFFIX}help ${Config.ARROW_SYMBOL} to see how to use`);
            } catch (err) {

            }
        } else {
            message.reply("✬ Group is Already Authorized ✬");
        }
    }
}