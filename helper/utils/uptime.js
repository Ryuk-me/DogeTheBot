const Config = require('../../Config');

module.exports = async (message) => {
    if (message.body.startsWith(Config.SUFFIX + "uptime")) {
        var time = process.uptime();
        var uptime = (time + "").toHHMMSS();
        message.reply("BOT is up for : " + uptime);
    }
}

// https://stackoverflow.com/questions/28705009/how-do-i-get-the-server-uptime-in-node-js/28706630
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}