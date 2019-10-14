const express = require('express')
const request = require('request')
const app = express()

app.set('port', process.env.PORT || 9292)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

function err (err) { console.error(err) }

function bot_reply({type, text, subtype}) {
    console.log({type, text, subtype})
    if (type === 'message' && subtype === 'bot_message') return
    
    const botMessageTypes = {
        message: {
            text: "Nice. Ask me about interventions.",
            channel: '#test_intervention_bot'
        },
        app_mention: {
            text: "Hello you. I'm @WhiteHatBot",
            channel: '#test_intervention_bot'
        }
    }

    request.post({
        uri: 'https://slack.com/api/chat.postMessage',
        headers: {
            Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
        },
        json: botMessageTypes[type]
    }, err)
}

app.post('/challenge', (req, res) => {
    res.send()
    bot_reply(req.body.event)
})

app.listen(app.get('port'), () => {
    console.log(`Intervention Bot alive on port ${app.get('port')}`)
})