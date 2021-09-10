const Config = require('../../Config');
const countMessage = require('../../model/messagecount');

module.exports = async (message, chat, client) => {
    if (message.body === Config.SUFFIX + "count") {
        let admins = [];
        for (let i = 0; i < chat.participants.length; i++) {
            if (chat.participants[i].isAdmin) {
                admins.push(chat.participants[i].id._serialized);
            }
        }
        if (admins.includes(message.author)) {
            let group_id = message.from;
            let message_id = message.id._serialized;
            let isCountAvailable = await countMessage.findOne({
                id: group_id
            })
            if (isCountAvailable !== null) {
                const date = new Date();
                if (new Date(isCountAvailable.coolDown) <= date) {
                    let allMemberMsgCountList = isCountAvailable.group;
                    allMemberMsgCountList = allMemberMsgCountList.sort((a, b) => (a.message_count < b.message_count) ? 1 : -1);
                    let real_mention = [];
                    for (let i = 0; i < allMemberMsgCountList.length; i++) {
                        real_mention.push({
                            id: {
                                _serialized: allMemberMsgCountList[i].number_id
                            }
                        })
                    }
                    let participants = [];
                    for (let i = 0; i < chat.participants.length; i++) {
                        participants.push(chat.participants[i].id._serialized);
                    }
                    if (allMemberMsgCountList.length > 0) {
                        let msg_to_send = "        ⁂ *Top Contributors* ⁂\n\n     *User*        |        *Messages*\n\n";
                        for (let i = 0; i < allMemberMsgCountList.length; i++) {
                            msg_to_send += (i + 1).toString() + '.  ' + '@' + allMemberMsgCountList[i].number_id.replace("@c.us", '') + "    |     " + allMemberMsgCountList[i].message_count + `  ${!participants.includes(allMemberMsgCountList[i].number_id) ? '[LEFT]\n' : '\n'}`;
                        }
                        msg_to_send += "\nTotal Messages : " + isCountAvailable.totalMessage + "\nCounted From : " + isCountAvailable.nextDate;
                        chat.sendMessage(msg_to_send, {
                            mentions: real_mention,
                            quotedMessageId: message_id
                        });
                        date.setDate(date.getDate() + 1);
                        isCountAvailable.coolDown = date;
                        await isCountAvailable.save();
                    }
                } else {
                    message.reply("*[COOLDOWN]*\n\nYou can only use this command once a day\nYou can use it again on :" + isCountAvailable.coolDown);
                }

            } else {
                message.reply("No Count Available for this Group\nPlease Check after some time.")
            }
        } else {
            message.reply("Only admins Can perform this action");
        }

    }
}