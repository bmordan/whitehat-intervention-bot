const express = require('express')
const request = require('request')
const app = express()

app.set('port', process.env.PORT || 9292)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/challenge', (req, res) => {
    console.log("FROM SLACK", req.body)
    res.send()
    request.post({
        uri: 'https://slack.com/api/chat.postMessage',
        headers: {
            Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
        },
        json: {
            text: "Hello you. I'm @WhiteHatBot",
            channel: 'test_intervention_bot'
        }
    }, (err, response, body) => {
        if (err) return console.error(err)
        console.log("AFTER POST TO SLACK", body)
    })
})

app.listen(app.get('port'), () => {
    console.log(`Intervention Bot alive on port ${app.get('port')}`)
})