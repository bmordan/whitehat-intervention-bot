const express = require('express')
const request = require('request')
const RiveScript = require('rivescript')
const app = express()
const bot = new RiveScript()
const channel = '#test_intervention_bot'

app.set('port', process.env.PORT || 9292)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

function err (err) { console.error(err) }

function bot_reply({username, text, subtype, type}) {
    if (subtype === 'bot_message') return
    console.log({type, app_mention: type === 'app_mention'})
    
    const user_input = (type === 'app_mention') ? '__hi' : text
    
    bot.reply(username, user_input).then(reply => {
        request.post({
            uri: 'https://slack.com/api/chat.postMessage',
            headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
            json: { text: reply, channel }
        }, err)
    })
}

app.post('/challenge', (req, res) => {
    res.send()
    bot_reply(req.body.event)
})

bot.loadFile(['./brain.rive'])
    .then(() => {
        bot.sortReplies()
        app.listen(app.get('port'), () => console.log(`Intervention Bot alive on port ${app.get('port')}`))
    })
    .catch(err)
