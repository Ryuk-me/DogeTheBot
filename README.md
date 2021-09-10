<p align="center">
<img src="https://github.com/Ryuk-me/DogeTheBot/blob/main/dogeImages/Doge-Flower.jpeg?raw=true" width="150" height="150"/>
</p>

<p align="center">
<a href="#"><img title="Whatsapp-Bot" src="https://img.shields.io/badge/WhatsApp Bot-EC8FD0?style=for-the-badge&logo=whatsapp&logoColor=white"></a>
</p>

<p align="center">
<a href="https://github.com/Ryuk-me"><img title="Author" src="https://img.shields.io/badge/Author-Ryuk--me-red.svg?style=for-the-badge&logo=github"></a>
</p>

<p align="center">
<a href="https://github.com/Ryuk-me"><img title="Followers" src="https://img.shields.io/github/followers/Ryuk-me?color=blue&style=flat-square"></a>
<a href="https://github.com/Ryuk-me/DogeTheBot/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/ryuk-me/DogeTheBot?color=red&style=flat-square"></a>
<a href="https://github.com/Ryuk-me/DogeTheBot/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Ryuk-me/DogeTheBot?color=red&style=flat-square"></a>
</p>

## Clone this project

```bash
> git clone https://github.com/Ryuk-me/DogeTheBot
```

## Install the dependencies:
Before running the below command, make sure you're in the project directory that
you've just cloned!!

```bash
> npm i (make sure node is intsalled in your computer)
```

## Credentials
> Open Config.js and fill all the details.

## Supported features
| Feature  | Status |
| ------------- | ------------- |
| Send Photo with Caption      | ✅  |
| Reply A Photo    | ✅  |
| Send Video or GIF with Caption   | ✅  |
| Slap   | ✅  |
| Command Timeout   | ✅  |
| Welcome Message   | ✅  |
| Get a random meme   | ✅ |
| Text to speech  | ✅  |
| Delete Message  | ✅  |
| Mention All User   | ✅ |
| Get Group Info | ✅ |
| Modify group info (subject, description)  | ✅  |
| Modify group settings (send messages, edit info)  | ✅  |
| Add group participants  | ✅  |
| Kick group participants  | ✅  |
| Promote/demote group participants | ✅ |
| enable or disable nsfw | ✅ |
| Mute/unmute chats | ✅ |
| Get Message Count By User | ✅ |
| Image Search | ✅ |
| Coding Playground (C, Python, Node) | ✅ |
| Authorization to use Bot | ✅ |
| Check Uptime and Authorization Status | ✅ |

### Owner Only features

| Feature  |              Status               |
| ------------- | ------------- |
| Authorization      | ✅  |
| Deauthorization      | ✅  |
| Get all authorised Group List    | ✅  |
| Forward message to all Group    | ✅  |




## To host this Bot on heroku
* Create a account on heroku and create a app.
    * Go to settings and enter following details
        * In reveal config vars add
            * KEY = TZ
            * VALUE = Asia/Kolkata 
        * Now click on add buildpack and add following
            1. `nodejs`
            2. `https://github.com/jontewks/puppeteer-heroku-buildpack.git`
            3. `https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git`
    * After that Install Heroku cli `https://devcenter.heroku.com/articles/heroku-cli`.
    * Enter command `heroku login` in command prompt and login with same account and enter details.
    * Now got to deploy option inside your created app on heroku and copy paste all commands one by one. 
    * After that you will see some logs in your terminal when its get completed go to resources and turn on your app.
    * Now your bot is running on heroku server make sure your mobile is always connected to the internet and whatsapp is running in background.



## Special Thanks to

* [`pedroslopez/whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js/)
* [`Nitin Shivam`](https://github.com/nitinshivam)
* [`Aman Dutt`](https://github.com/adgamerx)




#### You can fork the repo and deploy on VPS or deploy it on Heroku :)  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

---



