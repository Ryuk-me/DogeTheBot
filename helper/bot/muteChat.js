const Config = require('../../Config');

module.exports = async (message, chat) => {
    if (message.body.startsWith(Config.SUFFIX + "mute")) {
        let to_mute = parseInt(message.body.split(' ')[1]);
        if (to_mute !== null && to_mute !== undefined && !isNaN(to_mute) && to_mute !== ' ' && to_mute !== '') {
            if (to_mute <= Config.MAX_MUTE_TIME) {
                let mute_seconds = to_mute * 60;
                const unmuteDate = new Date();
                unmuteDate.setSeconds(unmuteDate.getSeconds() + mute_seconds);
                let admins = [];
                for (let i = 0; i < chat.participants.length; i++) {
                    if (chat.participants[i].isAdmin) {
                        admins.push(chat.participants[i].id._serialized);
                    }
                }
                if (admins.includes(message.author)) {
                    message.reply(`*Bot* is muted for ${to_mute} ${to_mute > 1 ? 'minutes' : "minute"}`);
                    await chat.mute(unmuteDate);
                } else {
                    message.reply("Only Admins can perform this action");
                }
            } else {
                message.reply("Maximum Time to mute is 300 minutes (5 hours)");
            }

        } else {
            message.reply("Please enter in this format\n" + Config.SUFFIX + "mute 10 (where 10 is time in minutes)")
        }

    }
}