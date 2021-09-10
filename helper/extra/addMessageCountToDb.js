const countMessage = require('../../model/messagecount');


module.exports = async (message, chat, isGroupAuth) => {
    chat = await message.getChat();
    let group_id = message.from;
    let participant = message.author;
    let isCountAvailable = await countMessage.findOne({
        id: group_id
    })
    if (isGroupAuth.coolDownTime === undefined) {
        isGroupAuth.coolDownTime = new Date();
        await isGroupAuth.save();
    }
    if (isCountAvailable === null) {
        const group = new countMessage({
            id: group_id,
            name: chat.name,
            group: [{
                number_id: participant,
                message_count: 1
            }],
            nextDate: new Date(),
            coolDown: new Date(),
            totalMessage: 1

        })
        await group.save();
    } else {
        let participantsInDb = [];
        for (let i = 0; i < isCountAvailable.group.length; i++) {
            participantsInDb.push(isCountAvailable.group[i].number_id);
        }
        if (participantsInDb.includes(participant)) {
            for (let i = 0; i < isCountAvailable.group.length; i++) {
                if (isCountAvailable.group[i].number_id === participant) {
                    isCountAvailable.group[i].message_count += 1;
                    isCountAvailable.totalMessage += 1;
                    await isCountAvailable.save();
                    break;
                }
            }
        } else {
            isCountAvailable.group.push({
                number_id: participant,
                message_count: 1
            });
            isCountAvailable.totalMessage += 1;
            await isCountAvailable.save();
        }
    }

}