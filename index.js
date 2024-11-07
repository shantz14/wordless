const express = require("express")
const app = express()

const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

const port = 4000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "wordless", "index.html")) 
})

app.get('/leaderboard', (req, res) => {
    console.log("here")
    res.sendFile(path.join(__dirname, "public", "wordless", "leaderboard", "index.html")) 
})

app.post('/api/win', (req, res) => {
    console.log(req.body.guesses)
    res.send({redirect: "/leaderboard"})
})

app.post('/api/lose', (req, res) => {
    console.log(req.body.guesses)
    res.send({redirect: "/leaderboard"})
})

app.listen(port, () => {
    console.log("Listening on port: " + port)
})
