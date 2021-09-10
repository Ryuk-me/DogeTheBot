const Config = require('../../Config');


const isTimeToMsg = async (isGroupAuth) => {
    let get_db_cooldown = isGroupAuth.coolDownTime;
    var diff = Math.abs(new Date() - new Date(get_db_cooldown));
    diff = Math.floor(Math.abs(diff / 1000));
    if (diff >= Config.COMMAND_TIMEOUT) {
        return [true, diff];
    } else {
        return [false, diff];
    }

}

const addNewCoolDownTime = async (isGroupAuth) => {
    const coolDownSeconds = new Date();
    coolDownSeconds.setSeconds(coolDownSeconds.getSeconds() + Config.COMMAND_TIMEOUT);
    isGroupAuth.coolDownTime = coolDownSeconds;
    await isGroupAuth.save();
}


module.exports = {
    isTimeToMsg: isTimeToMsg,
    addNewCoolDownTime: addNewCoolDownTime,
}