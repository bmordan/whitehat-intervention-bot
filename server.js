const express = require('express')
const app = express()

app.set('port', process.env.PORT || 9292)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post("/challenge", (req, res) => {
    const {challenge} = req.body
    res.send({challenge})
})

app.listen(app.get('port'), () => {
    console.log(`Intervention Bot alive on port ${app.get('port')}`)
})